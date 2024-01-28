import { db } from "../database.js";

export const messageSave = (req, res) => {
    const timestamp = Date.now();
    const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
    const optionsTime = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };
    const rDate = new Intl.DateTimeFormat("en-US", optionsDate).format(
        timestamp
    );
    const rTime = new Intl.DateTimeFormat("en-US", optionsTime).format(
        timestamp
    );
    const slq_inserQ =
        "insert into userdialog (`FromMail`,`ToMail`,`FromID`,`ToID`,`Message`,`msgDate`,`msgTime`) VALUES (?)";
    const value_List = [
        req.body.frommail,
        req.body.tomail,
        req.body.fromid,
        req.body.toid,
        req.body.message,
        rDate,
        rTime,
    ];

    db.query(slq_inserQ, [value_List], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(req.body.message);
    });
};
