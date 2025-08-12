const test = document.getElementById('toggleb')
test.addEventListener('click', function() {
    alert('Element ini diklik!');
  });
// document.addEventListener("DOMContentLoaded", function () {
//     var menuItems = document.querySelectorAll('#toggleb');
//     console.log(menuItems.length)
//     menuItems.forEach(function (item) {
//         item.addEventListener('click', function () {
//             alert('di klik')
//              // Hapus kelas aktif dari semua item
//              menuItems.forEach(function (menuItem) {
//                 menuItem.classList.remove('border-b-2', 'border-b-secondary', 'opacity-50');
//             });

//             // Tambahkan kelas aktif ke item yang diklik
//             item.classList.add('border-b-2', 'border-b-secondary');

//             menuItems.forEach(function (menuItem) {
//                 if (menuItem !== item) {
//                     menuItem.classList.add('opacity-50');
//                 }
//             });
//         });

//         item.addEventListener('mouseover', function () {
//             item.classList.add('hover:border-b-2', 'hover:border-b-secondary', 'hover:text-secondary');
//         });

//         item.addEventListener('mouseout', function () {
//             item.classList.remove('hover:border-b-2', 'hover:border-b-secondary', 'hover:text-secondary');
//         });
//     });
// });