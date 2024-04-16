export const createShop = async (req: Request, res: Response) => {
  // create shop account
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  res.status(201).json({ shop });
};
