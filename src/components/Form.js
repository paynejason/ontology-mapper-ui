import React, { useState } from "react";
function Form() {
  const [hidden, setHidden] = useState(true);
  const onClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
    console.log(hidden);
  };

  return (
    <div className="Form">
      <form
        action="http://localhost:5000/api/upload_file"
        method="POST"
        enctype="multipart/form-data"
      >
        {hidden ? (
          <div>
            <br />
            <button onClick={onClick}>v More Options v</button>
            <br />
            <br />
          </div>
        ) : (
          <div className="Horizontal">
            <br />
            <button onClick={onClick}> ^ More Options ^ </button>
            <br />
            <br />
            <label>Maximum # of Top Mappings : </label>
            <input type="text" name="Top_Mapping" />
            <br />

            <br />
            <label>Minimum Score (0-1) : </label>
            <input type="text" name="Min_Score" />
            <br />

            <br />
            <label>Individual : </label>
            <input type="text" name="Individual" />
            <br />
            <br />
            <hr />
            <br />
          </div>
        )}
        {/* <div> */}
        <div className="SourceAndTarget">
          <div className="vertical-source">
            <label>Source File </label>
            <input type="file" name="Source_File" />
            <br />
            <label>-OR-</label>
            <br />
            <label>Or Source Text </label>
            <input type="text" name="Source_Text" />
            <br />
          </div>
          {/* vertical*/}

          <div class="vertical-target">
            <label>Target File </label>
            <input type="file" name="Target_File" />
            <br />

            <label>-OR-</label>

            <br />
            <label>Or Target Link </label>
            <input type="text" name="Target_Link" />
            <br />
          </div>
        </div>{" "}
        {/* Source and Target*/}
        {/* </div> */}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;
