import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

// (Optional für Test 4: Wenn du eine andere Komponente hättest, würdest du sie so mocken)
// jest.mock("./Footer", () => () => <div>MockedFooterXYZ</div>);

describe("App component", () => {
  /** Test 1: testet das render der Überschrift */
  test("renders heading", () => {
    render(<App />);
    const headingElement = screen.getByRole("heading", { name: /ToDo Liste/i });
    expect(headingElement).toBeInTheDocument();
  });

  /**   Test  2: testet das Hinzufügen einer Aufgabe
   *
   */
  test("allows user to add a new task", () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Neue Aufgabe hinzufügen/i);
    const addButtonElement = screen.getByRole("button", {
      name: /Hinzufügen/i,
    });

    const taskName = "Buy groceries";
    fireEvent.change(inputElement, { target: { value: taskName } });
    fireEvent.click(addButtonElement);

    const newTaskElement = screen.getByText("Buy groceries");
    expect(newTaskElement).toBeInTheDocument();
  });

  /** Test 3 ( eigene Erweiterung): testen des Löschens einer Aufgabe  */

  test("allows user to delete a task", () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Neue Aufgabe hinzufügen/i);
    const addButtonElement = screen.getByRole("button", {
      name: /Hinzufügen/i,
    });

    fireEvent.change(inputElement, {
      target: { value: "Test Aufgabe löschen" },
    });
    fireEvent.click(addButtonElement);

    const deleteButton = screen.getByRole("button", { name: /Löschen/i });
    fireEvent.click(deleteButton);

    const deletedTask = screen.queryByText("Test Aufgabe löschen");
    expect(deletedTask).not.toBeInTheDocument();
  });

  /** Test 4 ( eigene Erweiterung): überprüft ob eingabefeld leer ist  */

  test("input field is initially empty", () => {
    render(<App />);
    const inputElement = screen.getByLabelText(/Neue Aufgabe hinzufügen/i);
    expect(inputElement.value).toBe("");
  });
});
