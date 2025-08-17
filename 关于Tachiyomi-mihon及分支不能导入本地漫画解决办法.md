Tachiyomi and Mihon and branches cannot import local comic solutions：

## 关于Tachiyomi/mihon导入本地漫画文件参阅以下示例：
![官方](https://p.sda1.dev/26/38b1544c84b2600e96334b79aab9de48/IMG_20250814_151339.jpg)
[你的存储位置] / local [系列标题] :
cover.jpg
chapter_1
image_1.ext
image_n.ext
chapter_2
image_1.ext
image_n.ext
chapter_n
image_1.ext 
Image_n.ext

Tachiyomi将在一个系列中看到三章。 具有图像的文件夹的路径必须包含串联标题和章节名称（如上所示）。
[img]https://lain.bgm.tv/pic/photo/l/94/1e/512889_uE8he.jpg[/img]
1. 指定你的位置
存储位置（例如/ tachiyomi /），应该有一个本地文件夹。 将正确的结构系列放在其中（例如/ tachiyomi / local /）内。
如果在文件夹中添加系列，建议添加名为.Nomedia的文件到本地文件夹所以图像不会在画廊中显示。
2. 你现在应该能够在本地源下的浏览→源中访问该系列。
如果你添加更多章节，那么你必须手动刷新章节列表（通过拉下列表）。
支持的章节格式是文件夹，其中包含图片（如jpg，.png等）或存档文件（zip | cbz，rar / cbr和epub）。 但预计目录和ZIP / CBZ的性能更好。

Aniyomi([url]https://aniyomi.org/docs/guides/local-manga-source/[/url]
[img]https://p.sda1.dev/26/0193d6d9cec7bb5584da0d6f127b6fbf/Screenshot_2025_0814_202704.jpg[/img]

mihon同上：
[url]https://mihon.app/docs/guides/local-source/[/url]

komikku同上：[url]https://komikku-app.github.io/docs/guides/local-source/[/url]

类似教程/tachiyomi版:
https://www.yeyulingfeng.com/69867.html

相关https://meta.appinn.net/t/topic/73891

————————
测试手机：
1，荣耀x10，安卓10(下文简称x10)
2，荣耀10青春版，安卓10(下文简称r10)
3，vivox21i，安卓9(下文简称x21)

# 测试软件：
1. TachiyomiJ2K1.7.4大小22.84m，r10怎么改怎么整都识别不了/无法导入❗

2. komikku1.13.2大小30.59m，在local创建文件夹并移动目标到此处，若只显示图片(cover)不显示章节是因为.nomedia文件❗把此文件删除就能看了，显示epub但貌似部分不支持/不能看，导入漫画话数列表若其他软件移动/删除了文件还是会显示❗刷新/删除/重开软件都没用(bug❗

3. Yōkai1.9.7.3大小22.38m，epub问题同上❗
4. Aniyomi0.16.4.3：把目标移动到local文件夹中创建的一个文件夹里，若不创建软件就不识别❗️可以到软件打开浏览后退出软件会自动生成封面👍
修改下载存储位置为同类路径，只要local文件夹有支持的文件即可查看，zip可以rar不行，r10设置自定义路径没有选择标志(可能导致识别不了本地文件❗️)x21正常❗️
x21/tachiyomiJ2k的文件夹被上面的aniyomi读取并创建别的文件夹/文件后可以识别local等其他文件夹，

x10，tachiyomiJ2K在local文件夹新建文件夹后把目标弄过去就能看了，没有封面浏览后自动生成，

[img]https://p.sda1.dev/26/77d4d2de5e57b0f1e4aca0be78a70624/PicsArt_08-14-06.43.43.png[/img]

## Yōkai(打❌的不能看/有问题/不支持：
[img]https://p.sda1.dev/26/6e40efd58d2fc4b5a7b75e532a12de02/PicsArt_08-14-06.36.00.png[/img]

注：为了方便测试所以名字和文件名乱七八糟😂，图片和文件实际上也是随便弄到一起的，将就一下吧

## 操作：
导入漫画，在Yōkai和komikku修改下载路径为本地漫画路径，路径中有local文件夹，没有就手动创建，名字最好不要大写/有空格❗在此文件夹中如果有文件夹，那就只能放图片格式文件，否则不显示❗如果不是一个系列的，文件后缀名必须要软件支持才显示/可以看，部分不支持比如epub(虽然显示了，可能多重文件夹压缩包不支持，


## TachiyomiJ2K另一种导入本地漫画方法：
1. 替换法，把已下漫画文件替换成目标文件但要修改文件名成替换文件的名字，但后缀名必须要和原来的文件名一致，所以替换文件修改后缀名后能正常被识别才行，比如zip可以改成cbz，但软件默认只识别cbz，或文件夹内图片格式jpg，所以如果是解压了的图片文件夹同理，

2. 已下漫画有话数列表是多个章节，把目标移动并重命名为后续未下载的章节即可，但后缀名必须保持一致(默认cbz)❗修改后软件可以识别，但章节最右侧的下载标志没有变深色可以忽略，重启后就变了，

总结：按道理来说TachiyomiJ2K应该正常的啊，曾几何时记得在某个旧版有导入过……而这软件现在貌似也被冷落很久没更新了，其他分支问题可能又大同小异具体请自行测试，经过测试发现Yōkai表现优秀👍，只要把文件弄到local文件夹就显示了(不显示在详情页下滑刷新一下，虽然不支持的文件还是和其他同类一样的问题，

相关：
https://meta.appinn.net/t/topic/73891

## 安卓端13个全测：
1. https://github.com/Jays2Kings/tachiyomiJ2K TachiyomiJ2K1.7.4，(正常情况)在软件路径创建local文件夹并移动目标即可，阅读界面有列表快捷，epub部分不支持(改后缀名成zip/cbz可以看的支持)

2. https://github.com/aniyomiorg/aniyomi Aniyomi0.16.4.3，修改存储位置为目标有local文件夹的路径/tachiyomiJ2K/local/即可，阅读界面无列表快捷❗

3. https://github.com/komikku-app/komikku komikku1.13.2，修改存储位置为目标有local文件夹的路径/tachiyomiJ2K/local/即可，阅读界面有列表快捷，

4. https://github.com/null2264/yokai Yōkai1.9.7.3，修改存储位置为目标有local文件夹的路径/tachiyomiJ2K/local/即可，阅读界面有列表快捷，

5. https://github.com/mihonapp/mihon ，版本0.19.1，修改存储位置为目标有local文件夹的路径/tachiyomiJ2K/local/即可，还是不支持epub，可能不是漫画/图片内容不支持，阅读界面无列表快捷❗

6. https://github.com/az4521/tachiyomiAZ/ ，版本v8.8.2-AZ，必须移动文件夹到软件路径tachiyomiAZ/local/，和设置(存储)下载路径没关系❗打开漫画默认是详情还要点击章节，阅读界面无列表快捷❗

7. https://github.com/jobobby04/TachiyomiSY/ ，版本1.12.0，在local目录创建文件夹把目标移动即可，可以把存储位置设置为同类的比如/tachiyomiJ2K/即可查看，阅读界面有列表快捷

8. https://github.com/NerdNumber9/TachiyomiEH ，版本v8.4.5-EH，移动目标到软件目录的local文件夹即可，和设置(存储)下载路径没关系❗阅读界面无列表快捷❗打开漫画默认是详情还要点击章节，

9. https://github.com/AmanoTeam/Kahon ，版本0.19.2，把存储位置设置为同类的比如/tachiyomiJ2K/即可查看，阅读界面无列表快捷❗

10. https://github.com/Saud-97/TachiyomiS97 ，版本1.7.4，绑定了默认路径/TachiyomiS97/local，把文件移动到此路径即可，和设置(存储)下载路径没关系❗

11. https://github.com/aayush2622/Dartotsu 版本0.0.2，看是否支持下载❗不支持本地导入媒体❗r10容易闪退❗不支持tachiyomi/aniyomi仓库❗

12. https://github.com/RyanYuuki/AnymeX ，版本2.9.9，本地文件只支持视频❗

13. https://github.com/RepoDevil/Himitsu ，版本1.0.3-b20028e0，可以修改下载器为第三方，不支持本地导入媒体，

## 总结：
1. 修改存储位置：aniyomi，komikku，Yōkai，mihon，tachiyomiSY，kahon，

2. 移动文件夹到软件固定路径(没有需要创建local：tachiyomiJ2K，tachiyomiAZ，tachiyomiEH，tachiyomiS97，

关于支持的格式，经过测试，rar，cbz，epub(纯图片/漫画)部分支持，rar5，epub小说不支持，虽然大部分是分支/翻版，但通过软件下载保存cbz格式的可能都有些不通用❗️以及备份数据同理，

～～～～～

🙃话说TachiyomiJ2K1.7.4，荣耀10青春版安卓10(上下文简称r10)，起初怎么改怎么整都识别不了/无法导入❗接着经过反复测试发现在/tachiyomiJ2K/local/再创建一个local文件夹然后把目标文件夹移动到此(tachiyomiJ2K/local/local/，按道理来说这样已经正常了(tachiyomiJ2K/local/，但r10/tachiyomiJ2K就是不显示/bug❗但查看此文件夹会自动生成cover，有2次偶然显示正常，但移动文件夹后又bug了，而且还是依赖这个文件夹，随便创建还不行，(部分压缩包提示不支持rar5和部分cbz格式)，第三次验证成功，路径：tachiyomiJ2K/local/local/目标，但这次没封面❗(封面可以在阅读界面长按设置图片)，改换名几次测试正常，没想到第四次终于正常了，但没显示封面，于是想着改名后怎样，接着改成中文名后就显示封面了，后面又反复测试几次，居然正常了😓，这软件是被窝调教正常了😂？总之这一遭实在是很莫名，应该是特殊情况或软件bug，其实或许可以通过清除数据/重装软件解决？但窝还是不信邪[s]喜欢折腾[/s]就……

～～～～～～～～
