export default function setClassNameToCurrent() {
  const allLinks = document.getElementsByClassName("link");

  for (const link of allLinks) {
    if (document.URL.toString().endsWith(link.id)) {
      link.className = "link current";
    } else {
      link.className = "link";
    }
  }
}
