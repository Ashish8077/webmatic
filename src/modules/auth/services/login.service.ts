import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";

export class LoginService {
  constructor(private userRepository = new UserRepository()) {}

  async execute(email: string, password: string, ip: string = "unknown") {
    // 1. Find user
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      // Generic message — never reveal whether email exists
      throw new Error("Invalid credentials");
    }

    // 2. Check account status
    if (user.status !== "active") {
      throw new Error("Your account is not active. Please contact support.");
    }

    // 3. Check account lock (brute-force protection)
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      const minutesLeft = Math.ceil(
        (new Date(user.locked_until).getTime() - Date.now()) / 60000,
      );
      throw new Error(
        `Account temporarily locked. Try again in ${minutesLeft} minute(s).`,
      );
    }

    // 4. Verify password
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      await this.userRepository.incrementFailedAttempts(user.id);
      throw new Error("Invalid credentials");
    }

    // 5. Update last login
    await this.userRepository.updateLastLogin(user.id, ip);

    // 6. Fetch permissions
    const permissions = await this.userRepository.getUserPermissions(user.id);

    // Return safe user object (no password_hash)
    const { password_hash, ...safeUser } = user;
    return { user: safeUser, permissions };
  }
}
