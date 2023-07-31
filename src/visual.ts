export default function showSeed(seed: string) {
  const title = document.getElementById("title") as HTMLElement;

  title.innerHTML += " " + seed;
}
