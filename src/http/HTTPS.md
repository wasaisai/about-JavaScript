HTTP一直保持着明文传输数据的特征, 使用HTTP传输的内容很容易被中间人窃取、伪造和篡改, 通常我们把这种攻击方式称为中间人攻击.  

具体来讲, 在将HTTP数据提交给TCP层之后, 数据会经过用户电脑、Wifi路由器、运营商和目标服务器, 在这中间的每个环节中, 数据都有可能被窃取或篡改.  

从HTTP协议栈层面来看, 我们可以在TCP和HTTP之间插入一个安全层, 所有经过安全层的数据都会被加密或者解密.  
HTTPS并非是一个新的协议, 通常HTTP直接和TCP通信, HTTPS则先和安全层通信, 然后安全层再和TCP通信. 也就是说HTTPS所有的安全核心都在安全层, 它不会影响到上面的HTTP协议, 也不会影响到下面的TCP/IP.  

安全层有两个主要的职责: **对发起HTTP请求的数据进行加密操作和对接收到HTTP的内容进行解密操作.**  

### 对称加密  
对称加密是指加密和解密使用相同的密钥. 为了让加密的密钥更加难以破解, 由服务器和客户端同时决定密钥, 具体过程如下:  
- 浏览器发送它所支持的加密套件列表和一个随机数client-random, 这里的**加密套件是指加密方法**, 加密套件列表就是指浏览器能支持多少种加密方法的列表.  
- 服务器会从加密套件 列表中选取一个加密套件, 然后还会生成一个随机数service-random, 并将service-random和加密套件列表返回给浏览器.  
- 最后浏览器和服务器分别返回确认消息.  

这样浏览器端和服务器端都有相同的client-random和servicc-random了, 然后它们再使用相同的方法将client-random和service-random混合起来生成一个密钥master secret, 有了密钥master secret和加密套件之后, 双方就可以进行数据的加密传输了.  

传输client-random和service-random的过程是明文的.  

### 非对称加密  
非对称加密算法有A、B两把密钥, 如果你用A密钥来加密, 那么只能使用B密钥来解密; 反过来, 如果用B密钥加密, 那么只能用A密钥来解密.  

在HTTPS中, 服务器会将其中一个密钥通过明文的形式发送给浏览器, 我们把这个密钥称为公钥, 服务器自己留下的那个密钥称为私钥.  
公钥是每个人都能获取到的, 而私钥只有服务器才能知道, 不对任何人公开.  

非对称加密请求流程:  
- 1. 首先浏览器发送加密套件列表給服务器.  
- 2. 服务器会选择一个加密套件, 不过和对称加密不同的是, 使用非对称加密时服务器上需要有用于浏览器加密的公钥和服务器解密HTTP数据的私钥, 由于公钥是給浏览器加密使用的, 因此服务器会将加密套件和公钥一起发送給浏览器.  
- 3. 浏览器和服务器返回确认消息. 

非对称加密存在的问题:  
1. 非对称加密的效率太低. 这会严重影响到加解密数据的速度, 进而影响到用户打开页面的速度.   
2. 无法保证服务器发送给浏览器的数据安全. 虽然浏览器端可以使用公钥来加密, 但是服务器端只能采用私钥来加密, 私钥加密只有公钥能解密, 但是黑客也可以获得公钥, 这样就不能保证服务端数据的安全了.  


### 对称加密和非对称加密搭配使用  

在传输数据阶段依然使用对称加密, 但是对称加密的密钥我们采用非对称加密来传输.  

流程: 
- 1. 浏览器向服务器发送对称加密套件列表、非对称加密套件列表和随机数client-random;  
- 2. 服务器保存随机数client-random, 选择对称加密和非对称加密的套件, 然后生成随机数service-random, 向浏览器发送选择的加密套件、service-random和公钥;  
- 3. 浏览器保存公钥, 并生成随机数pre-master, 然后利用公钥对pre-master加密, 并向服务器发送加密后的数据;  
- 4. 最后服务器拿出自己私钥, 解密出pre-master数据, 并返回确认消息.  

服务器和浏览器就有了共同的client-random、service-random和pre-master, 然后服务器和浏览器会使用这三组随机数生成**对称密钥**, 因为服务器和浏览器使用同一套方法来生成密钥, 所以最终生成的密钥也是相同的.  

需要特别注意的一点是, pre-master是经过公钥加密之后传输的, 所以黑客无法获取到pre-master, 这样黑客就无法生成密钥, 也就保证了黑客无法破解传输过程中的数据了.  


### 数字证书
对于浏览器来说, 数字证书有两个作用: 一个是通过数字证书向浏览器证明服务器的身份, 另一个是数字证书里面包含了服务器公钥.  
相比于第三版的HTTPS协议, 这里主要有两点改变:  
1. 服务器没有直接返回公钥給浏览器, 而是返回了数字证书, 而公钥正是包含在数字证书中的;  
2. 在浏览器端多了一个证书验证的操作, 验证了证书之后, 才继续后续流程.  
通过引入数字证书, 我们就实现了服务器的身份认证功能, 这样即便黑客伪造了服务器, 但是由于证书是没有办法伪造的, 所以依然无法欺骗用户.  

### 数字证书的申请和验证  
向CA(Certificate Authority)申请证书:
- 1. 服务器需要提供一套公钥、私钥, 私钥留着自己用  
- 2. 