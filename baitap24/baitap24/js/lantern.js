document.addEventListener('DOMContentLoaded', () => {
  const lantern = document.getElementById('lantern');
  const status = document.getElementById('status');
  if (!lantern) return;

  function setRunning(running) {
    lantern.style.animationPlayState = running ? 'running' : 'paused';
    if (status) status.textContent = running ? 'Đang quay' : 'Đã dừng';
  }

  lantern.querySelectorAll('.face').forEach((face) => {
    // Chuột: vào mặt đèn thì dừng, rê ra thì quay tiếp
    face.addEventListener('mouseenter', () => setRunning(false));
    face.addEventListener('mouseleave', (e) => {
      // Nếu chuột chỉ chuyển sang mặt khác thì vẫn giữ trạng thái dừng
      if (!(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('.face'))) {
        setRunning(true);
      }
    });
    // Cảm ứng: chạm giữ để dừng
    face.addEventListener('touchstart', () => setRunning(false), { passive: true });
    face.addEventListener('touchend', () => setRunning(true));
    face.addEventListener('touchcancel', () => setRunning(true));
  });
});
