export const questionTypes = ["Multiple Choice", "Short Answer", "Geo-Guesser"];

export const questionTypeMapper = (questionType) => {
  switch (questionType) {
    case 1:
      return "Multiple Choice"
    case 2:
      return "Short Answer"
    case 3:
      return "Geo-Guesser"
    default:
      return "Multiple Choice"
  }
}
