/*

Guidelines:
===========

- use .into() to turn stuff into JsValue
- some DOM/web features need to be required in cargo.toml, so may appear as missing until
  required
- Objects between JS<>Rust, if they're not JsValue, will be kinda clunky proxy-like objects.
  So to preserve productivity, don't use too much of these.
- there is a cost for data moving between wasm/js bridge, so reduce that, and don't be too chatty.


Examples:
=========

Left out a few structs here for example. Delete anything you don't need.


To learn more, see [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen)
 */
#![allow(clippy::missing_const_for_fn)]
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
// use wasm_bindgen::JsCast;

#[derive(Debug)]
#[wasm_bindgen(getter_with_clone)]
pub struct Opts {
    pub canvas_id: String,
    pub x: f32,
    pub y: f32,
    pub budget: usize,
}

#[wasm_bindgen]
impl Opts {
    #[allow(clippy::new_without_default)]
    #[wasm_bindgen(constructor)]
    #[must_use]
    pub fn new() -> Self {
        Self {
            canvas_id: String::new(),
            x: 0.0,
            y: 0.0,
            budget: 130_000,
        }
    }
}

#[derive(Debug, Clone, Serialize)]
struct Payload {
    hello: String,
}

#[derive(Debug, Clone, Serialize)]
struct Action {
    kind: String,
    payload: Payload,
}

use web_extensions::tabs;
use web_sys::console;
use yew::prelude::*;

#[function_component]
fn App() -> Html {
    let counter = use_state(|| 0);
    let onclick = {
        let counter = counter.clone();
        move |_| {
            let value = *counter + 1;
            counter.set(value);
        }
    };

    html! {
        <div>
            <div>{ "yew app!" }</div>
            <button {onclick}>{ "+1" }</button>
            <p>{ *counter }</p>
            <div id="root"></div>
        </div>
    }
}

// make it a callable function that mounts on a given ID, we call it from react
// when we want
#[wasm_bindgen(start)]
pub fn main() {}

#[wasm_bindgen]
pub fn mount_app(selector: &str) {
    let document = gloo::utils::document();
    let element = document.query_selector(selector).unwrap().unwrap();
    // executed automatically ...
    yew::Renderer::<App>::with_root(element).render();
}

/// run and spit out IR commands
///
#[wasm_bindgen]
pub fn run(opts: &Opts, code: &str) -> Result<JsValue, JsValue> {
    let res = vec![Action {
        kind: "run".to_string(),
        payload: Payload {
            hello: "world".to_string(),
        },
    }];
    JsValue::from_serde(&res).map_err(|err| err.to_string().into())
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Branch {
    pub name: String,
    pub commit: Commit,
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Commit {
    pub sha: String,
    pub commit: CommitDetails,
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CommitDetails {
    pub author: Signature,
    pub committer: Signature,
}

#[wasm_bindgen(getter_with_clone)]
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Signature {
    pub name: String,
    pub email: String,
}

#[wasm_bindgen]
pub fn analyze_tabs() -> Result<String, JsValue> {
    tabs::on_activated()
        .add_listener(|info| console::log_1(&format!("{:?}", info).into()))
        .forget();

    Ok("ok".to_string())
}
