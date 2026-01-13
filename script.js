// Data awal (kantin)
let listBarang = [
    { nama: "Nasi Goreng Spesial", jenis: "Makanan", stok: 15, harga: 15000 },
    { nama: "Es Teh Manis", jenis: "Minuman", stok: 50, harga: 5000 },
    { nama: "Keripik Kentang", jenis: "Camilan", stok: 30, harga: 3000 }
];

const foodForm = document.getElementById('foodForm');
const tableBody = document.getElementById('tableBody');
const btnSimpan = document.getElementById('btnSimpan');

// Tampilkan data ke tabel
function renderTable() {
    tableBody.innerHTML = "";
    listBarang.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${item.jenis}</td>
            <td>${item.stok}</td>
            <td>Rp ${parseInt(item.harga).toLocaleString('id-ID')}</td>
            <td>
                <button class="btn-edit" onclick="persiapkanEdit(${index})">Edit</button>
                <button class="btn-hapus" onclick="hapusBarang(${index})">Hapus</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// Submit: tambah atau update
foodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const index = parseInt(document.getElementById('editIndex').value);
    
    const dataBaru = {
        nama: document.getElementById('nama').value.trim(),
        jenis: document.getElementById('jenis').value,
        stok: parseInt(document.getElementById('stok').value),
        harga: parseInt(document.getElementById('harga').value)
    };

    // Validasi dasar
    if (!dataBaru.nama || dataBaru.stok < 0 || dataBaru.harga < 0) {
        alert("Nama wajib diisi, stok & harga tidak boleh negatif.");
        return;
    }

    if (index === -1) {
        // Tambah baru
        listBarang.push(dataBaru);
    } else {
        // Update
        listBarang[index] = dataBaru;
        // Reset ke mode tambah
        document.getElementById('editIndex').value = "-1";
        btnSimpan.textContent = "Simpan";
        btnSimpan.style.backgroundColor = "#2ecc71";
    }

    foodForm.reset();
    document.getElementById('stok').value = "0";
    document.getElementById('harga').value = "";
    renderTable();
});

// Hapus
function hapusBarang(index) {
    if (confirm("❌ Yakin hapus '" + listBarang[index].nama + "'?")) {
        listBarang.splice(index, 1);
        renderTable();
    }
}

// Edit: isi form & tukar tombol
function persiapkanEdit(index) {
    const item = listBarang[index];
    document.getElementById('nama').value = item.nama;
    document.getElementById('jenis').value = item.jenis;
    document.getElementById('stok').value = item.stok;
    document.getElementById('harga').value = item.harga;
    document.getElementById('editIndex').value = index;

    btnSimpan.textContent = "Update Menu";
    btnSimpan.style.backgroundColor = "#3498db";
}

// Jalankan saat pertama kali
renderTable();