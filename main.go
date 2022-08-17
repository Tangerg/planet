package main

import (
	"changeme/backend"
	"embed"
	"fmt"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	app1 := backend.NewApp1()
	// Create application with options
	err := wails.Run(&options.App{
		Title:     "planet",
		Width:     1050,
		MinWidth:  1050,
		Height:    700,
		MinHeight: 700,
		Assets:    assets,
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
			app1,
		},
	})

	if err != nil {
		fmt.Println("Error:", err)
	}
}
