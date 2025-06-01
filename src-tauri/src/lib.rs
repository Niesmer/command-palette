use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    AppHandle, Manager,
};

fn open_or_close_window(app: AppHandle) {
    let window = app.get_webview_window("window");
    let unwrapped_window = window.unwrap();
    if unwrapped_window.is_visible().ok().unwrap() {
        let _ = unwrapped_window.hide();
    } else {
        let _ = unwrapped_window.show();
        let _ = unwrapped_window.set_focus();
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .on_window_event(|window, event| match event {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                api.prevent_close();
                let _ = window.hide();
            }
            _ => {}
        })
        .setup(|app| {
            #[cfg(desktop)]
            {
                let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
                let opts_i = MenuItem::with_id(app, "options", "Settings", true, None::<&str>)?;

                let menu = Menu::with_items(app, &[&quit_i, &opts_i])?;
                let _tray = TrayIconBuilder::new()
                    .menu(&menu)
                    .icon(app.default_window_icon().unwrap().clone())
                    .on_menu_event(|app, event| match event.id.as_ref() {
                        "quit" => {
                            app.exit(0);
                        }
                        "options" => {
                            //TODO : Add options window
                        }
                        _ => {
                            println!("Not handled")
                        }
                    })
                    .show_menu_on_left_click(false)
                    .build(app)?;

                use tauri_plugin_global_shortcut::{
                    Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState,
                };

                let ctrl_shift_space =
                    Shortcut::new(Some(Modifiers::CONTROL | Modifiers::SHIFT), Code::Space);
                app.handle().plugin(
                    tauri_plugin_global_shortcut::Builder::new()
                        .with_handler(move |_app, shortcut, event| {
                            if shortcut == &ctrl_shift_space {
                                match event.state() {
                                    ShortcutState::Pressed => {
                                        open_or_close_window(_app.clone());
                                    }
                                    ShortcutState::Released => {}
                                }
                            }
                        })
                        .build(),
                )?;
                app.global_shortcut().register(ctrl_shift_space)?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
