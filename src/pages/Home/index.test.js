import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

jest.mock("../../contexts/DataContext/index.js", () => ({
  useData: () => ({
    last: {
      cover: "http://src-last-image",
      title: "Last Event",
      date: "2022-08-29",
      small: true,
      label: "boom",
    },
  }),
}));

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});



describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // to implement
  });
  it("a list a people is displayed", () => {
    // to implement
  });
  it("a footer is displayed", async () => {
    render(<Home />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("contact")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
  });
  it("an event card, with the last event, is displayed", () => {
    render(<Home />);

    const prestaSection = screen.getByTestId("presta");
    const eventCardContainer = screen.getByTestId("card-testid");
    const eventCardImage = eventCardContainer.querySelector("img");
    const eventCardTitle = eventCardContainer.querySelector(".EventCard__title");
    const eventCardMonth = eventCardContainer.querySelector(".EventCard__month");

    expect(prestaSection).toBeInTheDocument();
    expect(eventCardImage).toHaveAttribute("src", "http://src-last-image");
    expect(eventCardTitle.textContent).toEqual("Last Event");
    expect(eventCardMonth).toBeInTheDocument();
    expect(eventCardMonth.textContent).toEqual("août");
  });
});
