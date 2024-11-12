import AppHeader from "./AppHeader";

export function MainLayout(props) {
  return (
    <>
      <AppHeader/>
      {props.children}
    </>
  )
}
