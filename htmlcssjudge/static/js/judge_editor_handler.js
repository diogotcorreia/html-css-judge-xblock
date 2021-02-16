function getHtmlCssXblockHelper() {
  function replaceNewLines(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
  }

  // helper to visually format difference between outputs
  function formatOutputDiff(expected_out, output) {
    if (output == null) return "null";
    let i = 0,
      j = 0;
    while (j < output.length) {
      while (i < expected_out.length && expected_out[i] === "\n") i++;
      while (j < output.length && output[j] === "\n") j++;
      if (i >= expected_out.length || expected_out[i++] !== output[j])
        return (
          output.substr(0, j) +
          '<span style="color:red;font-weight: bold">' +
          (output[j] === " " ? "[whitespace]" : output[j]) +
          "</span>" +
          output.substr(j + 1, output.length - j - 1)
        );
      j++;
    }
    let formatted_output = output;
    if (i < expected_out.length)
      formatted_output +=
        '[<span style="color:red;font-weight: bold">' +
        expected_out.substr(i, expected_out.length - i) +
        "</span>]";
    return formatted_output;
  }

  function truncate(s) {
    if (s.length > 10000) s = s.substring(0, 10000);
    return s;
  }

  function truncateResponse(response) {
    if (response.stderr) response.stderr = truncate(response.stderr);
    if (response.expected_output)
      response.expected_output = truncate(response.expected_output);
    if (response.student_output)
      response.student_output = truncate(response.student_output);
    if (response.stdout) response.stdout = truncate(response.stdout);
  }

  function handleEditorResponse(response, feedbackElement, cb) {
    truncateResponse(response);
    if (response.result === "success") {
      feedbackElement.html(
        '<i aria-hidden="true" class="fa fa-check" style="color:green"></i> ' +
          response.message
      );
    } else {
      feedbackElement.html(
        '<span aria-hidden="true" class="fa fa-times" style="color:darkred"></span> <b><u>Erro no caso de teste</u></b>'
      );
    }
    // noinspection EqualityComparisonWithCoercionJS
    if (cb && response.result && "score" in response && response.score == 1.0)
      cb();
  }

  function getCodeEditor(element, readOnly = false) {
    let editor = ace.edit(element);
    editor.setOptions({
      maxLines: 50,
      minLines: 10,
      autoScrollEditorIntoView: true,
      theme: "ace/theme/monokai",
      showPrintMargin: false,
      mode: "ace/mode/html",
      fontSize: "14pt",
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
    if (!readOnly) {
      ace.require("ace/ext/language_tools");
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      });
    } else
      editor.setOptions({
        readOnly: true,
      });
    return editor;
  }

  return {
    replaceNewLines,
    formatOutputDiff,
    truncate,
    truncateResponse,
    handleEditorResponse,
    getCodeEditor,
  };
}
