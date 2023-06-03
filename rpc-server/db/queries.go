package db

import (
	"log"
	"github.com/dtzr09/IM_service/rpc-server/kitex_gen/rpc"
	"database/sql"
	"strings"
	"sort"
)

func InsertMessage(db_client MySQLClient, chat string, sender string, text string, sendTime int64) error {
	//sort the chat rm in alphabetical order
	names := strings.Split(chat, ":")
	for i, name := range names {
    names[i] = strings.ToLower(name)
	}
	sort.Strings(names)
	sortedChat := strings.Join(names, ":")

	query := `INSERT INTO messages (chat, sender, message, sendtime) VALUES (?, ?, ?, ?)`
	err := db_client.ExecQuery(query, sortedChat, sender, text, sendTime)
	if (err != nil){
		return err
	}
	return nil
}

func GetMessages(db_client MySQLClient, reverseSetting string, chat string, cursor int64, limit int32) (*sql.Rows, error) {
	names := strings.Split(chat, ":")
	for i, name := range names {
    names[i] = strings.ToLower(name)
	}
	sort.Strings(names)
	sortedChat := strings.Join(names, ":")
	newlimit := limit + 1

	query := `SELECT *, 
						(SELECT COUNT(*) FROM messages WHERE chat = ? AND sendtime >= ?) AS total_count
						FROM messages
						WHERE chat = ? 
						AND sendtime >= ?
						ORDER BY sendtime ` + reverseSetting + `
						LIMIT ?
						`

	rows, err := db_client.SelectQuery(query, sortedChat, cursor,  sortedChat, cursor, newlimit)
		
		if err != nil {
			log.Println("Error executing query:", err)
			return rows, err
		}

		return rows, nil
}

func GetProperties(rows *sql.Rows, limit int32)([]*rpc.Message, int64, bool, error){
	messages := make([]*rpc.Message, 0)

	var (
		message_id int
		chatRm     string
		text       string
		sender     string
		sendTime   int64
		totalCount int
	)

	count := 0


	for rows.Next() {
		if err := rows.Scan(&message_id, &chatRm, &sender, &text,  &sendTime,&totalCount); err != nil {
			return nil, 0, false, err
		}

		if(int32(count) == limit){
			break
		}

		message := &rpc.Message{
			Chat:     chatRm,
			Text:     text,
			Sender:   sender,
			SendTime: sendTime,
		}
		messages = append(messages, message)
		count++
	}

	hasMore := int32(totalCount) > limit
	return messages, sendTime, hasMore, nil
}