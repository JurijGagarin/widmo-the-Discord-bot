exports.run = (typ, seria, pozycja) => {
  var i;
  typ = typ.toString();
  seria = seria.toString();
  switch(typ+seria){
    case "ps1":
    case "tcp1":
      i = 0;
      break;
      
    case "tcp2":
    case "tcp3":
      if(pozycja == 1) i = 100;
      if(pozycja == 2) i = 80;
      if(pozycja >= 3) i = 75 - pozycja * 5;
      if(pozycja >= 15) i = 0;
      if(pozycja == -1) i = 0;
      break;

    case "tcp4":
      if(pozycja == 1) i = 100;
      if(pozycja == 2) i = 80;
      if(pozycja >= 3) i = 90 - pozycja * 10;
      if(pozycja >= 8) i = 55 - pozycja * 5;
      if(pozycja >= 11) i = 0;
      if(pozycja == -1) i = 0;
      break;

    case "ps2":
      if(pozycja == 1) i = 100;
      if(pozycja == 2) i = 80;
      if(pozycja >= 3) i = 90 - pozycja * 10;
      if(pozycja >= 6) i = 65 - pozycja * 5;
      if(pozycja >= 13) i = 0;
      if(pozycja == -1) i = 0;
      break;

    case "k31":
    case "wk1":
    case "tdw1":
      if(pozycja == 1) i = 200;
      if(pozycja == 2) i = 160;
      if(pozycja >= 3) i = 150 - pozycja * 10;
      if(pozycja >= 14) i = 10;
      if(pozycja >= 21) i = 0;
      if(pozycja == -1) i = 0;
      break;

    case "mn1":
      if(pozycja >= 1) i = 120 - pozycja * 20;
      if(pozycja >= 4) i = 90 - pozycja * 10;
      if(pozycja >= 6) i = 0;
      if(pozycja == -1) i = 0;
      break;

    case "drużx":
      if(pozycja >= 1) i = 2400 - pozycja * 400;
      if(pozycja >= 5) i = 500;
      if(pozycja >= 9) i = 0;
      if(pozycja == -1) i = 0;
      break;

    case "duetyx":
      if(pozycja >= 1) i = 1200 - pozycja * 200;
      if(pozycja >= 5) i = 250;
      if(pozycja >= 9) i = 0;
      if(pozycja == -1) i = 0;
      break;

    case "vcx":
      if(pozycja >= 1) i = 600 - pozycja * 100;
      if(pozycja >= 5) i = 125;
      if(pozycja >= 9) i = 0;
      if(pozycja == -1) i = 0;
      break;

    default:
      if(pozycja == 1) i = 100;
      if(pozycja == 2) i = 80;
      if(pozycja >= 3) i = 75 - pozycja * 5;
      if(pozycja >= 14) i = 5;
      if(pozycja >= 21) i = 0;
      if(pozycja == -1) i = 0;
  }
  return i;
};