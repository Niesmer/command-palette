use tauri::{AppHandle, Manager};

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
                api.prevent_close(); //TODO : have a way to really quit the app via system tray
                let _ = window.hide();
            }
            _ => {}
        })
        .setup(|app| {
            #[cfg(desktop)]
            {
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
