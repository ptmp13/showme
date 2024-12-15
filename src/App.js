// 'use client'
import React, {useEffect, useState} from "react";
import {
    EuiDescriptionList,
    EuiFlexGroup,
    EuiListGroup,
    EuiPanel,
    EuiTextArea,
    EuiTitle,
    EuiCallOut,
    EuiBadge,
    EuiSpacer,
    EuiFlexItem
} from '@elastic/eui';
import moment from "moment";
import './App.css';


function App() {
    const [info, setInfo] = useState([]);
    const [listInfo, setlistInfo] = useState([]);
    // const [infoMap, setInfoMap] = useState([])


    useEffect(() => {
        console.log("Call fetchUseInfo!")
        fetchUseInfo();
    }, []);

    async function fetchUseInfo() {
        try {
            const response = await fetch(
                "/restricted?info=json",
                {
                    method: 'GET'
                }
            );
            const json = await response.json();
            let ddd = []
            let objItem = [];
            objItem = {title: <EuiFlexItem><EuiSpacer size="xl" /><EuiBadge>Global Info</EuiBadge></EuiFlexItem>, description: ''}
            ddd.push(objItem)
            Object.keys(json).reduce((result, currentKey) => {
                if (typeof json[currentKey] != 'object' ) {
                    let newItem = [];
                    if ( currentKey === "exp" || currentKey === "iat" || currentKey === "auth_time" || currentKey === "access_token_expires" ) {
                        newItem = {title: <a>{currentKey}</a>, description: convertDate(json[currentKey])}
                    }
                    else if ( currentKey === "access_token" ) {
                        newItem = {title: <a>{currentKey}</a>, description: <EuiTextArea readOnly={true} isClearable={false}>{json[currentKey]}</EuiTextArea>}
                    }
                    else {
                        newItem = {title: <a>{currentKey}</a>, description: json[currentKey]}
                    }
                    ddd.push(newItem);
                }
                else {
                    // console.log("ERROR")
                    objItem = {title: <EuiFlexItem><EuiSpacer size="xl" /><EuiBadge>{currentKey}</EuiBadge></EuiFlexItem>, description: ''}
                    ddd.push(objItem)
                    Object.keys(json[currentKey]).reduce((result, currentKeyInside) => {
                        if (typeof json[currentKey][currentKeyInside] != 'object' ) {
                            let newItem = [];
                            if ( currentKeyInside === "exp" || currentKeyInside === "iat" || currentKeyInside === "auth_time") {
                                newItem = {title: <a>{currentKeyInside}</a>, description: convertDate(json[currentKey][currentKeyInside])}
                            }
                            else {
                                newItem = {title: <a>{currentKeyInside}</a>, description: json[currentKey][currentKeyInside].toString()}
                            }
                            ddd.push(newItem);
                        }
                    }, [])
                }
            }, []);
            setInfo(json);
            setlistInfo(ddd)

            // FOR MAP
            {/*var dataMap = new Map(Object.entries(json));
            var resultMap = new Map();
            for (const key of dataMap.keys())  {
                // console.log(key);
                var keyMap = new Map(Object.entries(dataMap.get(key)));
                resultMap.set(key, keyMap);
            }

            console.log("done!");
            for (const value of resultMap.values()) {
                // return (<a>value</a>
                // console.log(resultMap.keys());
                ddd.push(value)
            }
            setInfoMap(ddd) */}
            // console.log(info)
        } catch (error) {
            console.log(error.message);
        }
    }

    function convertDate(field) {
        var t = new Date(field * 1000);
        // t.setSeconds( info.a );
        var formatted = moment(t).format("DD.MM.YYYY HH:mm:ss");
        return formatted;
        // return t.toISOString();
    }

    return (
        <div className="App">
            <EuiDescriptionList compressed={false} listItems={listInfo} type="responsiveColumn" columnWidths="['50px', '20px']"/>
        </div>
    );
}

export default App;
