function renderBestOutcome(outcome: 1 | 2 | 3) {
  switch (outcome) {
    case 1:
      return "Time 1";
    case 2:
      return "Empate";
    case 3:
      return "Time 2";
    default:
      return "Outcome not found";
  }
}

export { renderBestOutcome };
