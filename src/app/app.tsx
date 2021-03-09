import React, { useState } from "react";
import { RecoilRoot } from "recoil";
import { MainHeader } from "./components/MainHeader";
import { MainFooter } from "./components/MainFooter";
import { MainContent } from "./components/MainContent";
import { DialogInitialize } from "./components/DialogInitialize";
import { BgTaskRunner } from "./components/BgTaskRunner";
import { ViewPort, Top, Bottom, LeftResizable, Fill } from "react-spaces";

const App = () => {
    const [initStatus, setInitStatus] = useState<
        "pending" | "success" | "error"
    >("pending");

    return (
        <RecoilRoot>
            <BgTaskRunner />
            <div className="app">
                {initStatus === "success" && (
                    <ViewPort>
                        <Top size={54} order={1}>
                            <MainHeader />
                        </Top>
                        <Fill>
                            <MainContent />
                        </Fill>
                        <Bottom size={50}>
                            <MainFooter />
                        </Bottom>
                    </ViewPort>
                )}
                <DialogInitialize
                    visible={initStatus === "pending"}
                    onSuccess={() => setInitStatus("success")}
                    onHide={() => setInitStatus("success")}
                />
            </div>
        </RecoilRoot>
    );
};

export default App;
