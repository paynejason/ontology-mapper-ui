import React from "react";

function Form() {
  return (
    <div>
      <form
        action="http://localhost:5000/api/upload_file"
        method="POST"
        enctype="multipart/form-data"
      >
        <label>File 1</label>
        <input type="file" name="file1" />
        <br/>

        <label>File 2</label>
        <input type="file" name="file2" />
        <br/>

        <label>Min Score</label>
        <input type="text" name="min_score" />
        <br/>

        <label>Individual</label>
        <input type="text" name="individual" />
        <br/>

        <label>Top Mapping</label>
        <input type="text" name="top_mapping" />
        <br/>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;
