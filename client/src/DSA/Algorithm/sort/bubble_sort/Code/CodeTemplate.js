import React, { useState } from "react";
import { codeStrings } from "./CodeData";
import Selector from "../../../../Algorithm/search/linear_search/extra/Selector";
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";

const CodeTemplate = ({ algo }) => {
  const [selected, setSelected] = useState("Python");

  const getMode = () =>
    selected === "C/C++" ? "c_cpp" : selected.toLowerCase();

  return (
    <div className="code-template">
      <Selector selected={selected} setSelected={setSelected} />
      <AceEditor
        className="editor"
        mode={getMode()}
        theme="textmate"
        fontSize={14}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={codeStrings[selected]}
        readOnly={true}
      />
    </div>
  );
};

export default CodeTemplate;
