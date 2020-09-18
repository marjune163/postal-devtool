import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { syncToBottom } from "./components/EventList";
import store from "./model/index";
import { Provider } from "react-redux";

const root = document.querySelector("#root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

if (process.env.NODE_ENV === "development") {
  const maxChannelCount = 3
  const maxTopicCount = 99;

  setInterval(() => {
    if (!store.getState().global.recording) {
      return;
    }

    const channelId = Math.floor(Math.random() * maxChannelCount + 1);
    const topicId = Math.floor(Math.random() * maxTopicCount + 1);

    store.dispatch.global.pushEvent({
      channel: `SomeChannel-${channelId}`,
      topic: `SomeTopic-${topicId}`,
      timestamp: Date.now(),
      data: {
        sn: `channel-${channelId}-topic-${topicId}`,
        others: {}
      }
    });

    if (store.getState().global.sticky) {
      syncToBottom();
    }
  }, 600);
}
