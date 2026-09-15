// $(document).ready() ช่วยให้มั่นใจว่าหน้าเว็บโหลดเสร็จก่อนค่อยรันสคริปต์
$(document).ready(function() {
    
    // 1. ฟังก์ชันเซฟลง Cookie
    function saveTodos() {
        const todos = [];
        // ใช้ jQuery ดึงข้อความจากทุกๆ กล่องงาน (.todo-item)
        $('#ft_list .todo-item').each(function() {
            todos.push($(this).text());
        });
        const jsonStr = JSON.stringify(todos);
        document.cookie = "todoCookie=" + encodeURIComponent(jsonStr) + "; path=/; max-age=86400";
    }

    // 2. ฟังก์ชันโหลดข้อมูลจาก Cookie
    function loadTodos() {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let c = cookies[i].trim();
            if (c.indexOf("todoCookie=") === 0) {
                const cookieData = c.substring("todoCookie=".length, c.length);
                if (cookieData) {
                    try {
                        const todos = JSON.parse(decodeURIComponent(cookieData));
                        // วนลูปสร้างรายการด้วย $.each()
                        $.each(todos, function(index, text) {
                            addTodoToDOM(text, true);
                        });
                    } catch (e) {
                        console.error("Error parsing cookies", e);
                    }
                }
                break;
            }
        }
    }

    // 3. ฟังก์ชันสร้างกล่องงานใหม่
    function addTodoToDOM(text, isLoad = false) {
        // สร้าง div ใหม่ด้วย jQuery
        const $div = $('<div></div>').addClass('todo-item').text(text);
        
        // กฎการลบ: เมื่อคลิก ให้ถามยืนยันก่อนลบ
        $div.click(function() {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove(); // คำสั่งลบของ jQuery สั้นมาก!
                saveTodos();
            }
        });

        // จัดเรียงลำดับการแสดงผล
        if (isLoad) {
            $('#ft_list').append($div); // โหลดจากคุกกี้ให้ต่อท้าย
        } else {
            $('#ft_list').prepend($div); // สร้างใหม่ให้อยู่บนสุด
        }
    }

    // 4. เมื่อกดปุ่ม New
    $('#newBtn').click(function() {
        const text = prompt('Create a new TO DO:');
        if (text !== null && text.trim() !== '') {
            addTodoToDOM(text, false);
            saveTodos();
        }
    });

    // โหลดข้อมูลเมื่อเปิดหน้าเว็บ
    loadTodos();
});