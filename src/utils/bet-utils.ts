function renderBestOutcome(outcome: number) {
  switch (outcome) {
    case 1:
      return 'Team 1'
    case 2:
      return 'Draw'
    case 3:
      return 'Team 2'
    default:
      return 'Outcome not found'
  }
}

export { renderBestOutcome }
