import workRepository from "../repository/work.repository.js";

// Function to generate a random unique workId
export const generateUniqueWorkId = async () => {
  const prefix = "work";
  let unique = false;
  let workNumber;

  while (!unique) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    workNumber = `${prefix}${randomNumber}`;
    const existingWork = await workRepository.findWorkById(workNumber);
    if (!existingWork) {
      unique = true;
    }
  }

  return workNumber;
};
