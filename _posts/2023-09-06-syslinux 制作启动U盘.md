---

---

Syslinux 是一个 Linux 启动加载器, 用它制作启动 U 盘，具有很好的兼容性。
如果直接将 PE 镜像刻录到 U 盘，无法正常启动的话，可以尝试一下 syslinux 的方式。
1. 修改 syslinux.cf 文件

  ```
  #到下载的syslinux安装包里去找，拷贝到这里就可以了
  default /boot/vesamenu.c32          

  #一个背景图片，640X480的
  MENU BACKGROUND /boot/peace.jpg     

  #标题而已，随便写吧
  MENU TITLE MultiBoot By Jeff        
  prompt 0
  timeout 90

  #双启动
  label puppy                         
  MENU LABEL Puppy USB Linux
  kernel /puppy/vmlinuz
  append initrd=/puppy/initrd.gz

  #关键是这里
  label winpe                          
  MENU LABEL WinPE Origin From Maotao
  kernel /ldntldr                   
  append initrd=/ntldr

  label reboot
         MENU LABEL Reboot
         kernel /boot/reboot.c32
  ```

  其中，ldntldr 是 grubutil 的一个工具，下载地址（http://download.gna.org/grubutil/）
  解压后找到 ldntldr.bin，复制到U盘根目录,并改名为ldntldr。

1. 把 WinPE (如：老毛桃) 解压，并把如下文件和文件夹复制到U盘根目录

```
/MiniPE
/WXPE
WINNT.XPE
```

把 /WXPE 中的两个文件剪切到U盘根目录，NTDETECT.COM不用动，SETUPLDR.BIN改名为ntldr。

1. 其它方式
   
把所有的文件都放到一个目录里，也就是 U 盘根目录下只有一个 /boot 目录。

```
/boot
/boot/syslinux
/boot/syslinux/ldlinux.sys
/boot/syslinux/syslinux.cfg
/boot/syslinux/vesamenu.c32
/boot/syslinux/peace.jpg
/boot/syslinux/reboot.c32
/boot/boot.cat
/boot/boot.msg
/boot/initrd.gz
/boot/isolinux.bin
/boot/ldntldr
/boot/ntd.com
/boot/ntldr
/boot/ntsf
/boot/OP.WIM
/boot/pup_400.sfs
/boot/vmlinuz
/boot/WINPE.INI
/boot/WINPE.IS_
/boot/zdrv_400.sfs
```

syslinux.cfg 配置如下

```
default /boot/syslinux/vesamenu.c32
MENU BACKGROUND /boot/syslinux/peace.jpg
MENU TITLE MultiBoot By Jeff
prompt 0
timeout 90

label puppy
MENU LABEL Puppy USB Linux
kernel /boot/vmlinuz
append initrd=/boot/initrd.gz

label winpe
MENU LABEL WinPE Origin From Maotao
kernel /boot/ldntldr
append initrd=/boot/ntldr

label reboot
       MENU LABEL Reboot
       kernel /boot/syslinux/reboot.c32
```

ntd.com是由NTDETECT.COM改名而成。ntsf由WINNT.XPE改名而成。

由于这两个文件改名后从根目录移动到 /boot 目录，并且没有了MiniPE和WXPE目录，需要做一些改动。

* 修改ntldr文件。

  用 UltraEdit 或者 WinHexSR 打开，直接到下拉菜单点“搜索-->替换文本 ”（Ctrl+H），输入NTDETECT.COM并替换成boot/ntd.com，名字可以任意，但是一定要记住长度要一样，“/”也算一个字符，一 共搜索出4个，替换前2个就行了。
  然后再搜索winnt.xpe，全部替换成boot/ntsf，也是长度一样。最后搜索wxpe，全部替换成 boot。然后保存退出。
 
* 修改WINPE.INI，把MINIPE替换成boot。
* 修改ntsf用记事本打开，修改成如下

  ```
  [SetupData]
  BootDevice="ramdisk(0)"
  BootPath="bootSYSTEM32"
  OsLoadOptions="/minint /fastdetect /rdexportascd /rdpath=bootWinPE.IS_"
  ```
把 WINPE.IS_ 复制到别的位置并改名为 WINPE.CAB，然后解压缩后得到 WINPE.ISO, 
用UltraISO打开，该ISO根目录即为WXPE，改为boot。
找到 /boot/system32/pecmd.ini,提取出来该文件并修改，就是把所有的 MINIPE 改为 boot。
然后把文件再导入 WINPE.ISO 保存。

用 Xcab 软件压缩为 WINPE.cab，改名为 WINPE.IS_，复制到原位置 覆盖原来的文件即可。


参考：

https://wiki.syslinux.org/wiki/index.php?title=SYSLINUX

https://wiki.archlinuxcn.org/wiki/Syslinux

https://huifu.wondershare.cn/what-is-windows-pe-and-how-it-works.html