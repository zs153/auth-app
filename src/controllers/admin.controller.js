export const mainPage = async (req, res) => {
  const user = req.user

  res.render('admin', { user })
}