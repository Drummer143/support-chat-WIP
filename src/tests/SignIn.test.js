import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import SignInForm from "../components/SignInForm/SignInForm";
import store from './../redux/store';

describe("Should render Sign In Form", () => {
    render(
        <Provider store={store}>
            <SignInForm />
        </Provider>);
    it("Shold contain button with text \"Sign In\"", () => {
        const component = screen.getByText("Sign In");
        expect(component).toBeInTheDocument();
    })
})