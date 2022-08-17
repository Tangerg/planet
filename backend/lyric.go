package backend

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

type App1 struct {
}

func NewApp1() *App1 {
	return &App1{}
}

func (a *App1) ParseLyric(lrc string) ([]*Lyric, error) {
	return ParseLyric(lrc)
}

type Lyric struct {
	Time   int64
	Lyric  string
	TLyric string
}

/* lrc 歌词格式
 * 1、标准格式： [分钟:秒.毫秒] 歌词  [01:23:456]
 * 2、其他格式1：[分钟:秒] 歌词 [01:23]
 * 3、其他格式2：[分钟:秒:毫秒] 歌词 与标准格式相比，秒后边的点号被改成了冒号 [01:23:456]
 * */
var lrcTimeReg = regexp.MustCompile(`\[(\d{2,}):(\d{2})[.|:]?(\d*)?]`)

func ParseLyric(lrc string) ([]*Lyric, error) {

	if lrc == "" {
		return nil, nil
	}

	ret := make([]*Lyric, 0)

	lrcLines := strings.Split(lrc, "\n")

	for i := range lrcLines {

		lrcTimeStrs := lrcTimeReg.FindStringSubmatch(lrcLines[i])

		if lrcTimeStrs == nil {
			continue
		}

		var lrcTime int

		for j := range lrcTimeStrs {

			if j == 0 {
				continue
			}

			lrcTimeNum, err := strconv.Atoi(lrcTimeStrs[j])

			if err != nil {
				return nil, err
			}

			//分钟转毫秒
			if j == 1 {
				lrcTimeNum = lrcTimeNum * 60 * 1000
			}
			//秒转毫秒
			if j == 2 {
				lrcTimeNum = lrcTimeNum * 1000
			}
			//j==3 毫秒不用处理

			lrcTime += lrcTimeNum
		}

		lrcContent := strings.TrimSpace(strings.ReplaceAll(lrcLines[i], lrcTimeStrs[0], ""))

		ret = append(ret, &Lyric{
			Time:   int64(lrcTime),
			Lyric:  lrcContent,
			TLyric: lrcContent,
		})
	}
	fmt.Println(ret)
	return ret, nil
}
