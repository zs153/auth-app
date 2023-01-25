// pages
export const mainPage = async (req, res) => {
  const user = {}
  const datos = {}

  res.render('admin', {
    user,
    datos,
  })
}
