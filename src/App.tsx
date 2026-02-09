import { useRef, useState } from "react";
import toast from "react-hot-toast";
import "./App.css";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [escaped, setEscaped] = useState(false);
  const [isYesHover, setIsYesHover] = useState(false);

  // const [noStyle, setNoStyle] = useState<React.CSSProperties>({});
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const pageRef = useRef<HTMLDivElement>(null);

  const noRef = useRef<HTMLButtonElement | null>(null);

  const moveNo = () => {
    if (!noRef.current || !pageRef.current || accepted) return;

    const btn = noRef.current;
    const page = pageRef.current;

    const pageRect = page.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const padding = 16;

    const maxX = pageRect.width - btnRect.width - padding;
    const maxY = pageRect.height - btnRect.height - padding;

    // حرکت نسبی (نه پرش مطلق)
    const deltaX = (Math.random() - 0.5) * 200;
    const deltaY = (Math.random() - 0.5) * 160;

    let nextX = noPos.x + deltaX;
    let nextY = noPos.y + deltaY;

    // Clamp = قفل داخل صفحه
    nextX = Math.max(padding, Math.min(nextX, maxX));
    nextY = Math.max(padding, Math.min(nextY, maxY));

    setEscaped(true);
    setNoPos({ x: nextX, y: nextY });
  };

  const handleYes = () => {
    if (accepted) return;

    setAccepted(true);
    toast.success("اس ام اسش برا میثم می‌ره");
    fetch("https://s-backend-vvol.onrender.com/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: "09304877106",
        message: "درخواست شما پذیرفته شد",
        sender: "2000660110",
      }),
    });
  };

  const handleNo = () => {
    toast("گزینه اشتباه! فکر کنم دستت خورد", { icon: "😔😢" });
    setYesScale((s) => s + 0.3);
    moveNo();
  };

  return (
    <div className="page" ref={pageRef}>
      <div className="center-layer">
        <div className="card">
          <img
            src={
              accepted
                ? "../public/sorry.png"
                : isYesHover
                  ? "../public/happy-minion.png"
                  : "../public/sad_minion.png"
            }
            className="image"
          />

          <h2>{accepted ? "گل برای گل" : "میثم معذرت می‌خواد می‌بخشیش؟"}</h2>
          {accepted && <h4>(الان میثم یدونه واقعیشم بهت بدهکاره)</h4>}

          {!accepted && (
            <div className="buttons">
              <button
                className="yes red"
                style={{ transform: `scale(${yesScale})` }}
                onClick={handleYes}
                onMouseEnter={() => setIsYesHover(true)}
                onMouseLeave={() => setIsYesHover(false)}
              >
                بله <span style={{ fontSize: 4 }}> پررنگ</span>
              </button>

              <button
                className="yes green"
                onMouseEnter={() => setIsYesHover(true)}
                onMouseLeave={() => setIsYesHover(false)}
                style={{ transform: `scale(${yesScale})` }}
                onClick={handleYes}
              >
                بله
              </button>

              <button
                ref={noRef}
                className="no"
                style={{
                  transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                }}
                onMouseEnter={moveNo}
                onMouseMove={escaped ? moveNo : undefined}
                onClick={handleNo}
              >
                خیر
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
