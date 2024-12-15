import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@elastic/eui/dist/eui_theme_light.json';
import {EuiPageTemplate, EuiProvider, EuiText, EuiTextColor,EuiTitle} from "@elastic/eui";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <EuiProvider colorMode="light">
        <EuiPageTemplate>
            <EuiPageTemplate.Section color={"subdued"} grow={true}>
                <EuiTitle size="xxs"><h3>support me=)</h3></EuiTitle>
                <App/>
            </EuiPageTemplate.Section>
        </EuiPageTemplate>
    </EuiProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
