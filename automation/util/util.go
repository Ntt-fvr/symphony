package util

import (
	"encoding/json"
	"fmt"
	"time"
)

func GetDateTimeFromString(date string) time.Time {
	dateTime, err := time.Parse(time.RFC3339, date)
	if err != nil {
		return time.Now()
	}
	return dateTime
}

func GetDurationFromSeconds(value int) time.Duration {
	duration, err := time.ParseDuration(fmt.Sprintf("%ds", value))
	if err != nil {
		return time.Minute
	}
	return duration
}

func GetDurationFromDateTime(dateTime time.Time) time.Duration {
	return dateTime.Sub(time.Now())
}

func ToJsonBytes(value map[string]interface{}) ([]byte, error) {
	return json.Marshal(value)
}

func ToJsonString(value map[string]interface{}) (string, error) {
	bytes, err := ToJsonBytes(value)
	if err != nil {
		return "", err
	}

	jsonValue := string(bytes)

	return jsonValue, nil
}
