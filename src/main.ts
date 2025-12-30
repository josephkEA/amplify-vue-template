import "./assets/main.css";
import "@aws-amplify/ui-vue/styles.css";
import "./assets/amplify-ui.css";
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

createApp(App).mount("#app");
