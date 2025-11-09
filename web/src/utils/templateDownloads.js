export const downloadTemplate = (type) => {
  let csvContent = "";
  let filename = "";

  if (type === "income-statement") {
    csvContent = `Kategori,Januari,Februari,Maret,April,Mei,Juni
Pendapatan Utama,50000000,55000000,52000000,58000000,60000000,62000000
Pendapatan Lain,2000000,1500000,2500000,1800000,2200000,2100000
Total Pendapatan,52000000,56500000,54500000,59800000,62200000,64100000
Biaya Pokok Penjualan,30000000,32000000,31000000,34000000,35000000,36000000
Biaya Operasional,8000000,8500000,8200000,8800000,9000000,9200000
Biaya Pemasaran,3000000,3200000,3100000,3300000,3400000,3500000
Biaya Administrasi,2000000,2100000,2000000,2200000,2300000,2400000
Total Biaya,43000000,45800000,44300000,48300000,49700000,51100000
Laba Kotor,22000000,23500000,23500000,25800000,27200000,28000000
Laba Bersih,9000000,10700000,10200000,11500000,12500000,13000000`;
    filename = "template-laporan-laba-rugi.csv";
  } else if (type === "cash-flow") {
    csvContent = `Kategori,Januari,Februari,Maret,April,Mei,Juni
Kas Masuk Operasional,45000000,48000000,46000000,52000000,54000000,56000000
Kas Masuk Investasi,5000000,0,0,10000000,0,0
Kas Masuk Pendanaan,0,0,15000000,0,0,0
Total Kas Masuk,50000000,48000000,61000000,62000000,54000000,56000000
Kas Keluar Operasional,38000000,40000000,39000000,43000000,44000000,45000000
Kas Keluar Investasi,8000000,0,2000000,5000000,0,3000000
Kas Keluar Pendanaan,2000000,2000000,2000000,2000000,2000000,2000000
Total Kas Keluar,48000000,42000000,43000000,50000000,46000000,50000000
Arus Kas Bersih,2000000,6000000,18000000,12000000,8000000,6000000
Saldo Kas Awal,10000000,12000000,18000000,36000000,48000000,56000000
Saldo Kas Akhir,12000000,18000000,36000000,48000000,56000000,62000000`;
    filename = "template-arus-kas.csv";
  } else {
    csvContent = `Kategori,Nilai
Kas,50000000
Piutang,25000000
Persediaan,30000000
Peralatan,80000000
Total Aset,185000000
Utang Dagang,15000000
Utang Bank,40000000
Total Utang,55000000
Modal Sendiri,130000000
Total Pasiva,185000000`;
    filename = "template-neraca.csv";
  }

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
