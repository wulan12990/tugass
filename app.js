const express = require("express");
const path = require("path");
const daftarMenu = require("./data/menu");

const app = express();
const PORT = 3000;

// Mengatur EJS sebagai view engine
app.set("view engine", "ejs");

// Mengatur lokasi folder views dan public menggunakan path absolut
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Halaman katalog dengan filter kategori
app.get("/", (req, res) => {
  const kategori = req.query.kategori;

  let menuDitampilkan = daftarMenu;

  if (kategori) {
    menuDitampilkan = daftarMenu.filter(
      (menu) => menu.kategori === kategori
    );
  }

  res.render("katalog", {
    daftarMenu: menuDitampilkan,
    kategori: kategori || "semua"
  });
});

// Halaman detail menu berdasarkan ID
app.get("/menu/:id", (req, res) => {
  const id = Number(req.params.id);

  const menu = daftarMenu.find((item) => item.id === id);

  if (!menu) {
    return res.status(404).render("not-found");
  }

  res.render("detail", { menu });
});

// Halaman 404 untuk alamat yang tidak tersedia
app.use((req, res) => {
  res.status(404).render("not-found");
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});