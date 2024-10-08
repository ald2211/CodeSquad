import userRepository from "../repository/user.repository.js";
import workRepository from "../repository/work.repository.js";
import { errorHandler } from "../utils/customError.js";

class adminService {
  async findAllUsers(page, limit, search) {
    const result = await userRepository.findAllUsers(page, limit, search);
    const sanitizedResult = {
      count: result.count,
      users: result.users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      }),
    };

    return sanitizedResult;
  }

  async updateUserStatus(id, { userState }) {
    const updatedUser = await userRepository.findByIdAndUpdate(id, {
      userState: !userState,
    });
    if (!updatedUser) {
      throw errorHandler(404, "user not found");
    }

    return updatedUser._doc.userState;
  }

  async findAllWorks(role, page, limit, search) {
    return await workRepository.findAllCommittedWorks(
      role,
      "",
      page,
      limit,
      search
    );
  }

  async getDashboardDetails() {
    const usersCount = await userRepository.findCountOfUsers();
    const projectsCount = await workRepository.findTotalWorks();
    const chartData = await userRepository.getDataForChart();
    const { topClients, topDevelopers } =
      await workRepository.findTopThreeClientsAndDevelopers();
    return { usersCount, projectsCount, chartData, topClients, topDevelopers };
  }

  async findCompletedWorks(role, page, limit, search) {
    return await workRepository.findAllCompletedWorks(
      role,
      "",
      page,
      limit,
      search
    );
  }

  async updateWorkStatus(id) {
    const updatedData = await workRepository.findByWorkIdAndUpdate(id, {
      workStatus: "completed",
    });
    if (!updatedData) {
      throw errorHandler(404, "work not found");
    }
  }
}

export default new adminService();
