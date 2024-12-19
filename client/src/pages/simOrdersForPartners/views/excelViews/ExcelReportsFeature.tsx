export const ExcelReportsFeature = async (
  workbook,
  title,
  params,
  data,
  isAdmin
) => {
  const font4TableTitles = { name: "Times New Roman", size: 17, bold: true };
  const font4Columns = {
    name: "Times New Roman",
    size: 11,
    bold: true,
    color: { argb: "FFF0F0F0" },
  };
  const worksheet = workbook.addWorksheet(`${title}`, {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      fitToPage: false,
      horizontalCentered: true,
      blackAndWhite: true,
    },
    views: [
      {
        showGridLines: false,
      },
    ],
  });

  worksheet.pageSetup.margins = {
    left: 0.15,
    right: 0.25,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3,
  };

  worksheet.properties.defaultRowHeight = 28;

  worksheet.columns = [
    { header: "", key: "index" },
    { header: "", key: "orderCode" },
    { header: "", key: "package" },
    { header: "", key: "number" },
    { header: "", key: "partner" },
    { header: "", key: "customerName" },
    { header: "", key: "customerPhone" },
    { header: "", key: "address" },
    { header: "", key: "email" },
    { header: "", key: "total" },
  ];

  const D3 = worksheet.getCell("E2");
  D3.value = "BÁO CÁO ĐĂNG KÝ THÔNG TIN BỘ KIT";
  D3.font = font4TableTitles;

  worksheet
    .addRow(["", `Ngày: ${params?.start} - ${params?.end}`])
    .eachCell({ includeEmpty: false }, function (cells) {
      cells.font = { name: "Times New Roman", italic: true, size: 11 };
    });

  if (isAdmin === true) {
    worksheet
      .addRow([
        "",
        `Mã đối tác: ${!!params?.partner ? params?.partner : "Tất cả"}`,
      ])
      .eachCell({ includeEmpty: false }, function (cells) {
        cells.font = { name: "Times New Roman", italic: true, size: 11 };
      });
  }

  worksheet
    .addRow(["", `Loại gói: ${!!params?.package ? params?.package : "Tất cả"}`])
    .eachCell({ includeEmpty: false }, function (cells) {
      cells.font = { name: "Times New Roman", italic: true, size: 11 };
    });

  worksheet.addRow(["", "", "", "", "", "", "", "", "", ""]);

  worksheet
    .addRow([
      ,
      "STT",
      "Mã đơn hàng",
      "Loại gói",
      "Số Sim",
      "Đối tác",
      "Họ và tên",
      "Số điện thoại",
      "Địa chỉ",
      "Email",
      "Tổng tiền (VND)",
    ])
    .eachCell({ includeEmpty: false }, function (cells) {
      cells.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cells.width = 30;
      cells.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF174EAD" },
      };
      cells.font = font4Columns;
      cells.alignment = { vertical: "middle", horizontal: "center" };
    });

  data.forEach((item, index) => {
    worksheet
      .addRow([
        ,
        index + 1,
        item?.orderCode,
        item?.package,
        item?.number,
        item?.partner,
        item?.customerName,
        item?.customerPhone,
        item?.address,
        item?.email,
        new Intl.NumberFormat().format(item?.total),
      ])
      .eachCell({ includeEmpty: true }, function (cells) {
        cells.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        cells.font = { name: "Times New Roman", size: 11 };
        cells.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
      });
  });

  worksheet.getColumn("B").width = 25;
  worksheet.getColumn("H").width = 35;
  worksheet.getColumn("I").width = 21;
  worksheet.getColumn("C").width = 13;
  worksheet.getColumn("D").width = 20;
  worksheet.getColumn("E").width = 20;
  worksheet.getColumn("G").width = 20;
  worksheet.getColumn("F").width = 20;
  worksheet.getColumn("J").width = 18;
};
