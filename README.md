# คู่มือและสรุปคำสั่ง Struts2 Framework

https://khone3.github.io/Struts2/

Struts2 เป็น Framework สำหรับพัฒนาเว็บแอปพลิเคชันด้วยภาษา Java โดยใช้สถาปัตยกรรม MVC (Model-View-Controller) ซึ่งมีชุด Tag Library (Struts2 Tags) เพื่อช่วยในการแสดงผลข้อมูลและสร้างฟอร์มบนหน้า JSP ได้อย่างง่ายดาย

ในการใช้งาน Struts2 Tags ในหน้า JSP ต้องประกาศ taglib ไว้ที่ด้านบนสุดของไฟล์เสมอ:
```jsp
<%@ taglib prefix="s" uri="/struts-tags" %>
```

---

## 1. Control Tags (แท็กควบคุมเงื่อนไขและการวนลูป)

แท็กกลุ่มนี้ใช้ควบคุมการไหลของโปรแกรม เช่น การตรวจสอบเงื่อนไข (If-Else) และการวนลูป (Looping)

### `s:if`, `s:elseif`, `s:else`
ใช้ตรวจสอบเงื่อนไขตามค่าที่กำหนด

**ตัวอย่าง:**
```jsp
<s:set var="score" value="85" />

<s:if test="%{#score >= 80}">
    <p>คุณได้เกรด A</p>
</s:if>
<s:elseif test="%{#score >= 70}">
    <p>คุณได้เกรด B</p>
</s:elseif>
<s:else>
    <p>คุณต้องพยายามอีกนิด</p>
</s:else>
```

### `s:iterator`
ใช้สำหรับวนลูปแสดงข้อมูลจาก List, Set หรือ Map

**ตัวอย่าง (วนลูปจาก List):**
```jsp
<ul>
    <s:iterator value="userList" var="user" status="stat">
        <li>
            ลำดับที่ <s:property value="#stat.count" />: 
            ชื่อ <s:property value="#user.name" /> 
            อายุ <s:property value="#user.age" />
        </li>
    </s:iterator>
</ul>
```
*(หมายเหตุ: `status` ใช้ดึงข้อมูลของลูป เช่น `.count` คือลำดับปัจจุบัน, `.index` คือ index ที่เริ่มจาก 0, `.even`/.odd ใช้เช็คคู่/คี่)*

---

## 2. Data Tags (แท็กสำหรับจัดการและเข้าถึงข้อมูล)

ใช้ดึงค่าจาก Action (ValueStack) หรือกำหนดค่าตัวแปรในหน้าจอ

### `s:property`
ใช้แสดงผลค่าของตัวแปรหรือค่าพรอพเพอร์ตี้ที่ส่งมาจาก Action

**ตัวอย่าง:**
```jsp
<!-- แสดงผลข้อความธรรมดา -->
<p>ชื่อผู้ใช้: <s:property value="username" /></p>

<!-- กำหนดค่าเริ่มต้น หาก username เป็น null -->
<p>ชื่อผู้ใช้: <s:property value="username" default="ผู้เยี่ยมชม" /></p>
```

### `s:set`
ใช้สร้างตัวแปรเก็บไว้ใน Context เพื่อเรียกใช้งานในภายหลัง

**ตัวอย่าง:**
```jsp
<s:set var="myColor" value="'blue'" />
<p style="color: <s:property value='#myColor' />">
    ข้อความสีน้ำเงิน
</p>
```

### `s:date`
ใช้จัดรูปแบบการแสดงผลวันที่และเวลา

**ตัวอย่าง:**
```jsp
<s:date name="birthDate" format="dd/MM/yyyy" />
<s:date name="currentTime" format="yyyy-MM-dd HH:mm:ss" />
```

### `s:url` และ `s:a`
ใช้สร้าง URL สำหรับอ้างอิงหรือทำลิงก์

**ตัวอย่าง:**
```jsp
<!-- สร้าง URL แล้วเก็บในตัวแปร -->
<s:url var="myLink" action="loginAction">
    <s:param name="id" value="101" />
</s:url>

<!-- สร้างแท็ก a (link) -->
<s:a href="%{myLink}">ไปที่หน้า Login</s:a>
```

### `s:text`
ใช้แสดงผลข้อความที่ดึงมาจากไฟล์ properties (Resource Bundle) ใช้สำหรับทำระบบหลายภาษา (i18n)

**ตัวอย่าง:**
```jsp
<!-- ในไฟล์ properties มี key ชื่อ welcome.msg=ยินดีต้อนรับ -->
<h1><s:text name="welcome.msg" /></h1>
```

---

## 3. Form Tags (แท็กสำหรับการสร้างฟอร์ม)

ใช้สร้าง HTML Form ที่มีการเชื่อมโยงข้อมูล (Data Binding) กับ Action ของ Struts2 อัตโนมัติ

### `s:form`
สร้างฟอร์มสำหรับส่งข้อมูล

**ตัวอย่าง:**
```jsp
<s:form action="saveUser" method="post" theme="simple">
    <!-- ใส่แท็ก input ต่างๆ ภายในนี้ -->
</s:form>
```

### `s:textfield` และ `s:password`
สร้างกล่องรับข้อความและกล่องรับรหัสผ่าน

**ตัวอย่าง:**
```jsp
<s:textfield name="username" label="ชื่อผู้ใช้" />
<s:password name="password" label="รหัสผ่าน" />
```

### `s:hidden`
สร้างฟิลด์ซ่อน

**ตัวอย่าง:**
```jsp
<s:hidden name="userId" value="999" />
```

### `s:textarea`
สร้างกล่องรับข้อความขนาดใหญ่

**ตัวอย่าง:**
```jsp
<s:textarea name="address" label="ที่อยู่" rows="5" cols="40" />
```

### `s:radio`
สร้างปุ่มตัวเลือกแบบเลือกได้ข้อเดียว

**ตัวอย่าง:**
```jsp
<!-- genderList เป็น Map (เช่น {"M":"ชาย", "F":"หญิง"}) หรือ List ใน Action -->
<s:radio name="gender" list="#{'M':'ชาย', 'F':'หญิง'}" label="เพศ" />
```

### `s:checkbox` และ `s:checkboxlist`
สร้างกล่องตัวเลือก (Checkbox)

**ตัวอย่าง:**
```jsp
<!-- กล่องเดียว -->
<s:checkbox name="agree" label="ยอมรับเงื่อนไข" />

<!-- หลายกล่อง (เลือกได้หลายข้อ) -->
<s:checkboxlist name="hobbies" 
                list="#{'1':'ดูหนัง', '2':'ฟังเพลง', '3':'เล่นเกม'}" 
                label="งานอดิเรก" />
```

### `s:select`
สร้าง Dropdown List

**ตัวอย่าง:**
```jsp
<s:select name="country" 
          list="countryList" 
          listKey="countryId" 
          listValue="countryName" 
          headerKey="-1" 
          headerValue="-- กรุณาเลือกประเทศ --" 
          label="ประเทศ" />
```

### `s:file`
สร้างช่องสำหรับอัปโหลดไฟล์

**ตัวอย่าง:**
```jsp
<s:form action="upload" method="post" enctype="multipart/form-data">
    <s:file name="uploadImage" label="เลือกไฟล์รูปภาพ" />
    <s:submit value="อัปโหลด" />
</s:form>
```

### `s:submit`
สร้างปุ่มยืนยันฟอร์ม

**ตัวอย่าง:**
```jsp
<s:submit value="บันทึกข้อมูล" align="center" />
```

---

## 4. Error & Message Tags (แท็กสำหรับแสดงข้อความแจ้งเตือน/ข้อผิดพลาด)

ใช้แสดงข้อความจาก `ActionMessages`, `ActionErrors` หรือ `FieldErrors` ที่ตรวจสอบ (Validation) จาก Action

### `s:actionerror`
แสดงข้อความข้อผิดพลาดระดับ Action

**ตัวอย่าง:**
```jsp
<!-- หากมี addActionError("ไม่พบผู้ใช้งานนี้"); จะมาแสดงตรงนี้ -->
<s:actionerror cssClass="error-message" />
```

### `s:actionmessage`
แสดงข้อความแจ้งเตือนหรือข้อความสำเร็จ

**ตัวอย่าง:**
```jsp
<!-- หากมี addActionMessage("บันทึกข้อมูลสำเร็จ"); จะมาแสดงตรงนี้ -->
<s:actionmessage cssClass="success-message" />
```

### `s:fielderror`
แสดงข้อผิดพลาดของแต่ละฟิลด์ (มักเกิดจากการทำ Validation)

**ตัวอย่าง:**
```jsp
<!-- แสดง error ของฟิลด์ username โดยเฉพาะ -->
<s:fielderror fieldName="username" />
```

---

## 5. การตั้งค่า `struts.xml` เบื้องต้น

ไฟล์ `struts.xml` เป็นศูนย์กลางการควบคุมของ Struts2

**ตัวอย่าง:**
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE struts PUBLIC
    "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
    "http://struts.apache.org/dtds/struts-2.5.dtd">

<struts>
    <!-- กำหนดค่าคอนฟิกบางอย่าง -->
    <constant name="struts.devMode" value="true" />

    <package name="default" namespace="/" extends="struts-default">
        
        <!-- ตัวอย่าง Action -->
        <action name="login" class="com.example.LoginAction" method="execute">
            <result name="success">/welcome.jsp</result>
            <result name="error">/login.jsp</result>
            <result name="input">/login.jsp</result>
        </action>

    </package>
</struts>
```
