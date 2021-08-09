# ผู้จัดทำ(กลุ่ม5)
- ชัชชาย จันทร์เพ็ชร์ 6210450059
- ชาญวิทย์ สายสิญจน์ 6210450521
- ณิชนันทน์ จตุปาริสุทธิศิล 6210450571

## Requirement
```
Node.js
ถ้ายังไม่มี -> https://nodejs.org/en/
```
## Project setup (Install)
```
git clone https://github.com/ChanwitSS/vue-homework-gamification.git
npm install หรือ yarn install
```

### Compiles and hot-reloads for development
```
npm run serve หรือ yarn serve
```

### Compiles and minifies for production
```
npm run build หรือ yarn build
```
## vue-homework-gamification
- เป็นproject ที่ทำขึ้นมาเพื่อเป็นตัวกลางในการส่งและตรวจการบ้าน
แล้วก็แลกรางวัลจากคะแนนการส่งการบ้าน
- มีการแบ่งผู้ใช้เป็น 3 แบบ ได้แก่
    - อาจารย์
    - นักเรียน
    - ผู้ดูแลระบบ

## Feature ของ homework web application
- ผู้ใช้ทั้ง 3 แบบมีfeatureร่วมกัน คือ สามารถดูตารางคะแนนที่เรียงลำดับตามช่วงเวลา, คะแนนที่ใช้ หรือ คะแนนที่ได้รับของนักเรียนได้
-  อาจารย์
    - สั่งการบ้านและตรวจการบ้าน
- นักเรียน
    - ส่งการบ้าน, แลกรางวัลและดูประวัติการแลกรางวัล
- ผู้ดูแลระบบ
    - เพิ่มผู้ใช้ที่เป็นอาจารย์และนักเรียนได้
    - เพิ่ม, แก้ไขและลบรางวัลได้


## การใช้งาน homework web application
- สามารถเข่าสู่ระบบได้โดยกรอกusernameหรือemail และ password โดยมีข้อมูลดังนี้
    -  อาจารย์
        - email: webtech@hotmail.com, username: Teacher01 ,password: password
        - email: os@hotmail.com, username: Teacher02 ,password: password
    - นักเรียน
        - email: stu01@hotmail.com, username: Student01 ,password: password
        - email: stu02@hotmail.com, username: Student02 ,password: password
    - ผู้ดูแลระบบ
        - email: admin@a.com, username: admin ,password: password
- เมื่อเข้าสู้ระบบแล้วสามารถเลือกใช้งานfeatureต่างๆได้ที่sidebarทางข้างซ้าย
