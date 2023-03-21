import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Presenter from "./Presenter";
import { observe } from "mobx";
import ChildComponent from "./Child/ChildComponent";

function App() {
  // binding output goes here
  const [viewModel, setViewModel] = useState({});
  const presenter = new Presenter();
  useEffect(() => {
    async function load() {
      observe(presenter, "viewModel", (obj) => {
        setViewModel(obj.newValue);
      });
      await presenter.load();
    }
    load();
  }, []);

  return (
    <>
      <h3>Working on presentation [up/down]</h3>
      {viewModel.formattedString}
      <br />
      <br />
      <input
        value={viewModel.fName}
        onChange={(event) => {
          setViewModel({
            ...viewModel,
            fName: event.target.value
          });
        }}
      />
      <input
        value="update"
        type="button"
        onClick={() => {
          presenter.submit(viewModel);
        }}
      />
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
