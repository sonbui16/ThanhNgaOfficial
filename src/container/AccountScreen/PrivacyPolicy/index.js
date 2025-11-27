import React, {useEffect} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {scale} from 'react-native-size-scaling';

import colors from 'variables/colors';
import SafeAreaViews from 'components/SafeAreaView';

const PrivacyPolicy = ({navigation, route}) => {
  const {type} = route.params;
  useEffect(() => {
    navigation.setOptions({
      headerTitle:
        type === 'privacy' ? 'Chính sách riêng tư' : 'Điều khoản dịch vụ',
    });
  }, []);
  return (
    <SafeAreaViews style={{backgroundColor: 'white'}}>
      <ScrollView style={{padding: scale(15)}}>
        {type === 'privacy' ? (
          <View>
            <Text
              style={{
                fontSize: scale(22),
                color: colors.blue3,
                textAlign: 'center',
                fontWeight: 'bold',
                marginVertical: 5,
              }}>
              CHÍNH SÁCH RIÊNG TƯ EDUBIT
            </Text>
            <Text style={{fontSize: scale(14), color: 'black'}}>
              Chào mừng bạn đến với chính sách riêng tư của Edubit. Đây là những
              chính sách về việc chúng tôi sử dụng các thông tin cá nhân của bạn
              nếu bạn là người sử dụng Edubit hoặc ghé thăm trang web của chúng
              tôi.
              {'\n'} Khi chúng tôi nói "chúng tôi" hoặc "Edubit " đó là vì chúng
              tôi sở hữu và điều hành trang web.{'\n'} Nếu chúng tôi nói đến
              "chính sách", chúng tôi đang nói đến chính sách riêng tư. Nếu
              chúng tôi nói "các điều khoản sử dụng" là chúng tôi đang nói đến
              các điều luật sử dụng trang web. Các điều khoản và chính sách này
              có thể được thay đổi và điều chỉnh tùy theo dịch vụ mà bạn sử dụng
              và có điểm khác biệt với chính sách này.
              {'\n'}
              <Text style={styles.text}>
                I. Thông tin chúng tôi thu thập về bạn{' '}
              </Text>
              {'\n'}
              Chúng tôi thu thập một số thông tin cá nhân về những người ghé
              thăm và sử dụng trang web của chúng tôi.{'\n'} Chúng tôi thu thập
              một số thông tin cá nhân về những người ghé thăm và sử dụng trang
              web của chúng tôi.{'\n'}
              Những thông tin phổ biến nhất mà chúng tôi thu thập là: tên người
              dùng, tên thành viên, địa chỉ email, địa chỉ IP, các thông tin
              liên lạc khác, phản hồi từ các khảo sát, blog, ảnh, các thông tin
              thanh toán như chi tiết đại lý thanh toán, chi tiết giao dịch,
              thông tin thuế, hỗ trợ kê khai, comment từ diễn đàn, dữ liệu phân
              tích trang web. Chúng tôi cũng sẽ thu thập các thông tin cá nhân
              từ đơn ứng tuyển (CV, bảng mẫu, thư ứng tuyển và ghi chú khi phỏng
              vấn...).
              {'\n'} Để đảm bảo nâng cao chất lượng Dịch vụ mà chúng tôi cung
              cấp, Edubit thu thập và lưu trữ những thông tin về dữ liệu học tập
              của học viên tham gia vào các bài giảng, khóa học, hay truy cập
              bất kỳ nội dung nào khác được đăng tải trên website. Bao gồm số
              lượt truy cập, thời lượng học, thời gian xem video bài giảng, tần
              suất học tập, kết quả bài kiểm tra, kết quả đánh giá học tập, tiến
              trình học, các thông tin, trạng thái giao dịch của học viên,
              comment trên hệ thống bài giảng, khóa học, dữ liệu phân tích kết
              quả học tập khác, các nội dung yêu cầu hỗ trợ và thông tin cá nhân
              bao gồm họ tên, địa chỉ email, số điện thoại liên lạc, địa chỉ ip,
              hệ điều hành, trình duyệt học viên đang sử dụng, ảnh đại diện cùng
              càng thông tin khác bạn đăng tải lên hệ thống.{'\n'}
              <Text style={styles.text}>
                II. Thông tin cá nhân của bạn mà chúng tôi thu thập từ bên khác
              </Text>
              {'\n'}
              Mặc dù chúng tôi thường thu thập thông tin cá nhân trực tiếp từ
              bạn, đôi khi, chúng tôi cũng thu thập một số danh mục thông tin cá
              nhân nhất định về bạn từ các nguồn khác. Đặc biệt như:{'\n'} Thông
              tin tài chính, giao dịch từ các nhà cung cấp thanh toán đặt tại
              Việt Nam hoặc các bên đối tác cung cấp dịch vụ thanh toán để xử lí
              các thanh toán.
              {'\n'} Các bên cung cấp dịch vụ thứ ba (Như Google, Facebook),
              những đơn vị có thể cung cấp thông tin của bạn khi bạn liên kết,
              kết nối hoặc đăng nhập tài khoản của bạn bằng các bên cung cấp thứ
              ba và họ gửi chúng tôi những thông tin như việc đăng ký hay thông
              tin cá nhân của bạn từ dịch vụ đó. Thông tin phụ thuộc vài các bên
              cung cấp dịch vụ hoặc sự cho phép của bạn thông qua các cài đặt
              riêng tư ở bên cung cấp dịch vụ đó.{'\n'}
              Các nguồn khác của bên thứ ba / hoặc các đối tác từ Úc, Hoa Kỳ
              hoặc Vương quốc Anh, theo đó chúng tôi nhận được thông tin bổ sung
              về bạn (trong phạm vi được luật pháp hiện hành cho phép), chẳng
              hạn như dữ liệu nhân khẩu học hoặc thông tin phát hiện gian lận và
              kết hợp với thông tin chúng tôi có về bạn . Ví dụ: cảnh báo gian
              lận từ nhà cung cấp dịch vụ như dịch vụ xác minh danh tính. Chúng
              tôi cũng nhận được thông tin về bạn và các hoạt động của bạn trong
              và ngoài nền tảng Edubit thông qua quan hệ đối tác hoặc về trải
              nghiệm và tương tác của bạn từ các mạng quảng cáo đối tác của
              chúng tôi. Chúng tôi cũng nhận được thông tin về bạn với tư cách
              là chủ bản quyền từ các tác giả bên thứ ba của chúng tôi. Ví dụ:
              thông tin dưới dạng bản phát hành mẫu khi hình ảnh của bạn được sử
              dụng trong một mục được cung cấp trên trang web của chúng tôi.
              {'\n'}
              <Text style={styles.text}>
                III. Chúng tôi sử dụng các thông tin cá nhân của bạn như thế
                nào?{' '}
              </Text>
              {'\n'}
              Chúng tôi sẽ sử dụng thông tin cá nhân của bạn để:{'\n'} Hoàn
              thành hợp đồng hoặc các bước liên quan đến hợp đồng; cụ thể là
              trong việc tạo điều kiện và xử lí các giao dịch xuất hiện trên
              trang web, trạng thái giao dịch xuất hiện trên website của chúng
              tôi{'\n'} Trường hợp này là cần thiết cho các mục đích đó của
              chúng tôi, hoặc bên thứ ba, lợi ích hợp pháp. Những lợi ích này
              bao gồm:{'\n'} Điều hành trang web.{'\n'} Cung cấp cho bạn đúng
              dịch vụ đã được mô tả trên trang web.
              {'\n'} Xác nhận danh tính của bạn khi bạn đăng nhập vào trang web
              của chúng tôi.{'\n'} Phản hồi các yêu cầu hỗ trợ kĩ thuật và giúp
              tạo điều kiện giải quyết mọi tranh chấp.{'\n'}
              Cập nhật cho bạn tin tức và thông tin hoạt động về trang web và
              dịch vụ của chúng tôi, ví dụ: để thông báo cho bạn về những thay
              đổi đối với trang web, gián đoạn trang web hoặc cập nhật bảo mật
              của chúng tôi. Thực hiện các phân tích kỹ thuật để quyết định cách
              cải thiện trang web và các dịch vụ mà chúng tôi cung cấp.{'\n'} Đo
              lường các hoạt động trên trang web, ví dụ: để xác định các hành vi
              lừa đảo tiềm tàng và để đảm bảo sự tuân thủ với điều khoản sử dụng
              được áp dụng trên trang web.{'\n'} Quản lý mối quan hệ của Edubit
              với bạn, ví dụ: bằng cách phản hồi các bình luận hoặc câu hỏi của
              bạn tới chúng tôi trên trang web hoặc yêu cầu các phản hồi của bạn
              hoặc khi bạn muốn tham gia các khảo sát.{'\n'}
              Quản lý các vấn đề pháp lý và hoạt động của chúng tôi (bao gồm,
              quản lý các rủi ro liên quan đến nội dung và các vấn đề gian lận).
              {'\n'} Huấn luyện đội ngũ Edubit về việc phục vụ cồng đồng người
              dùng một cách tốt nhất.{'\n'} Cải thiện sản phẩm và dịch vụ của
              chúng tôi.
              {'\n'} Xử lí các đơn ứng tuyển việc làm của bạn tới Edubit.{'\n'}
              <Text style={styles.text}>IV. Bạn sẽ cho phép chúng tôi:</Text>
              {'\n'}
              Cung cấp cho bạn các thông tin Marketing về các sản phẩm và dịch
              vụ mà chúng tôi cảm thấy có thể làm bạn hứng thú.{'\n'} Cá nhân
              hóa các dịch vụ và website, như các quảng cáo xuất hiện trên trang
              web - nơi liên quan đến việc sử dụng cookies hoặc các công nghệ
              tương tự - nhằm cung cấp một trải nghiệm riêng tư hơn.{'\n'}
              <Text style={styles.text}>
                V. Để phục vụ các mục đích được yêu cầu bởi pháp luật
              </Text>
              {'\n'}
              Với mục đích đáp ứng yêu cầu của chính phủ, tòa án của pháp luật,
              hoặc cơ quan thực thi pháp luật tiến hành một cuộc điều tra.{'\n'}
              <Text style={styles.text}>
                VI. Chúng tôi đính kèm các thông tin của bạn khi nào?
              </Text>
              {'\n'}
              Chúng tôi sẽ đính kèm thông tin cá nhân cho những người nhận sau:
              {'\n'} Các bên đối tác cung ứng Dịch vụ, tính năng hợp tác cùng
              Edubit hoặc các công ty có liên kết với Edubit dưới sự bảo vệ của
              Pháp luật.
              {'\n'} Tác giả của bất kỳ sản phẩm hoặc dịch vụ nào có sẵn cho
              bạn, để họ có thể tạo điều kiện hỗ trợ và xác thực giấy phép,
              quyền sử dụng sản phẩm hay dịch vụ mà bạn mong muốn tích hợp trên
              hệ thống của Edubit.{'\n'} Nhà thầu phụ và nhà cung cấp dịch vụ hỗ
              trợ chúng tôi liên quan đến cách chúng tôi sử dụng thông tin cá
              nhân (như được nêu ở trên), cụ thể bao gồm các dịch vụ hosting
              website, lưu trữ và mã hóa video, hỗ trợ kỹ thuật, hỗ trợ kinh
              doanh từ các bên đối tác, hỗ trợ quay video bài giảng, hỗ trợ xây
              dựng nội dung, các dịch vụ marketing, kinh doanh khóa học, các bên
              đối tác affiliate, các dịch vụ hỗ trợ khác. Các bên đối tác của
              chúng tôi cũng như các nhà thầu cung cấp dịch vụ cũng có quyền
              trao đổi và tiếp cận những thông tin này từ các nước khác ngoài
              nơi họ vận hành.{'\n'} Các cố vấn chuyên nghiệp của chúng tôi
              (luật sư, kế toán, cố vấn tài chính,....) được đặt tại Việt Nam.
              {'\n'} Các nhà quản lý và cơ quan chính phủ liên quan đến các thủ
              tục và nghĩa vụ tuân thủ của chúng tôi.{'\n'} Một bên thứ ba phản
              hồi các yêu cầu liên quan đến điều tra tội phạm hoặc bị nghi ngờ
              hoặc nghi ngờ hoạt động bất hợp pháp.{'\n'} Một bên thứ ba, để
              thực thi hoặc bảo vệ các quyền của chúng tôi, hoặc để giải quyết
              các rủi ro tài chính hoặc uy tín.{'\n'}
              Người nắm giữ quyền liên quan đến cáo buộc vi phạm quyền sở hữu
              trí tuệ hoặc bất kỳ vi phạm nào khác.{'\n'} Những người nhận khác
              mà chúng tôi được pháp luật cho phép hoặc yêu cầu làm như vậy.
              {'\n'}
              <Text style={styles.text}>
                VII. Nơi chúng tôi chuyển và/hoặc lưu trữ thông tin cá nhân của
                bạn
              </Text>
              {'\n'}
              Công ty chúng tôi được đặt ở Việt Nam, vì vậy dữ liệu của bạn sẽ
              được xử lý ở Việt Nam cùng các trung tâm dữ liệu của các nhà cung
              cấp dịch vụ lưu trữ là đối tác của chúng tôi. Một số người nhận đã
              được nêu ở mục VI phía trên và những người đó có thể tiếp cận dữ
              liệu cá nhân của bạn nằm ngoài phạm vi địa lý mà chúng tôi vận
              hành. Bạn được hiểu là đã chấp thuận và cho phép chúng tôi làm
              những việc này. Edubit làm mọi công việc có thể để bảo vệ thông
              tin cá nhân của bạn khi làm việc với các bên đối tác và nhà cung
              cấp dịch vụ khác trong điều kiện và các điều khoản về bảo mật
              thông tin theo tiêu chuẩn có thể chấp nhận được giữa các bên.
              {'\n'}
              <Text style={styles.text}>
                VIII. Chúng tôi bảo mật thông tin cá nhân của bạn như thế nào?{' '}
              </Text>
              {'\n'}
              Chúng tôi lưu trữ thông tin cá nhân trên các máy chủ bảo mật do
              chúng tôi và nhà cung cấp dịch vụ của chúng tôi quản lý và đôi khi
              các tệp sao chép cứng được lưu giữ ở một vị trí an toàn ở
              Singapore. Thông tin cá nhân mà chúng tôi lưu trữ hoặc truyền được
              bảo vệ bằng các điều khiển truy cập và bảo mật, bao gồm xác thực
              tên người dùng và mật khẩu, xác thực hai yếu tố và mã hóa dữ liệu
              khi thích hợp.
              {'\n'}
              <Text style={styles.text}>
                IX. Chúng tôi truy cập thông tin cá nhân của bạn như thế nào?
              </Text>
              {'\n'}
              Bạn có thể truy cập một số thông tin cá nhân mà chúng tôi thu thập
              về bạn bằng cách đăng nhập vào tài khoản của bạn. Bạn cũng có
              quyền yêu cầu truy cập thông tin cá nhân khác mà chúng tôi lưu giữ
              về bạn và yêu cầu sửa chữa bất kỳ lỗi nào trong dữ liệu đó. Bạn
              cũng có thể đóng tài khoản bạn có với chúng tôi trên trang web nào
              của chúng tôi bất kỳ lúc nào. Để thực hiện yêu cầu truy cập hoặc
              chỉnh sửa, hãy liên hệ với chúng tôi bằng cách sử dụng chi tiết
              liên hệ ở cuối chính sách này.
              {'\n'}
              <Text style={styles.text}>
                X. Việc sử dụng thông tin cá nhân của bạn cho Marketing
              </Text>
              {'\n'}
              Khi chúng tôi có sự đồng ý của bạn (ví dụ: nếu bạn đã đăng ký nhận
              e-mail của chúng tôi), chúng tôi gửi cho bạn các email quảng cáo
              về các sản phẩm và dịch vụ chúng tôi cảm thấy có thể bạn quan tâm.
              Bạn có thể chọn "không quan tâm" các thông tin đó nếu bạn không
              muốn nhận chúng trong tương lai bằng cách chọn “hủy đăng ký” được
              cung cấp trong email đó.{'\n'} Bạn cũng có các lựa chọn về cookie,
              như được mô tả bên dưới. Bằng cách sửa đổi tùy chọn trình duyệt
              của bạn, bạn có thể chọn chấp nhận tất cả cookie, để được thông
              báo khi cookie được đặt hoặc từ chối tất cả cookie. Nếu bạn chọn
              từ chối cookie, một số phần của trang web của chúng tôi có thể
              không hoạt động đúng trong trường hợp của bạn.
              {'\n'}
              <Text style={styles.text}>XI. Cookie và phân tích trang web</Text>
              {'\n'}
              Khi bạn truy cập trang web của chúng tôi, có một số thông tin nhất
              định được ghi lại thông tin ẩn danh nói chung và không tiết lộ
              danh tính của bạn. Nếu bạn đã đăng nhập vào tài khoản của mình,
              một số thông tin này có thể được liên kết với tài khoản của bạn.
              Chúng ta đang nói về các loại chi tiết sau:{'\n'} Địa chỉ IP hoặc
              địa chỉ IP máy chủ proxy của bạn.{'\n'} Tên miền mà bạn yêu cầu.
              {'\n'} Tên đại lý cung cấp Internet của bạn thỉnh thoảng sẽ hiện,
              tùy thuộc vào cấu hình kết nối ISP của bạn.{'\n'} Ngày và giờ mà
              bạn truy cập trang web.
              {'\n'} Thời gian bạn truy cập.{'\n'} Những trang mà bạn đã truy
              cập.
              {'\n'} Số lần bạn truy cập trang web của chúng tôi trong bất kì
              tháng nào.{'\n'} Tệp URL bạn nhìn vào và các thông tin liên quan
              đến nó.
              {'\n'}
              Website điều hướng bạn đến trang web của chúng tôi.{'\n'} Hệ điều
              hành mà máy tính bạn sử dụng.{'\n'} Thỉnh thoảng, chúng tôi sẽ sử
              dụng các công ty quảng cáo của bên thứ ba để phân phát quảng cáo
              dựa trên các lượt truy cập trước vào trang web của chúng tôi. Ví
              dụ: nếu bạn truy cập vào trang web của chúng tôi, sau đó bạn có
              thể thấy phần bổ sung cho các sản phẩm và dịch vụ của chúng tôi
              khi bạn truy cập một trang web khác.
              {'\n'}
              <Text style={styles.text}>XII. Thông tin trẻ em</Text>
              {'\n'}
              Trang web của chúng tôi không phù hợp với trẻ em dưới 16 tuổi, vì
              vậy nếu bạn dưới 16 tuổi, chúng tôi yêu cầu bạn không sử dụng
              trang web của chúng tôi hoặc cung cấp cho chúng tôi thông tin cá
              nhân của bạn. Nếu bạn từ 16 đến 18 tuổi, bạn có thể duyệt các
              trang web nhưng bạn sẽ cần sự giám sát của cha mẹ hoặc người giám
              hộ để trở thành người dùng đã đăng ký. Đó là trách nhiệm của cha
              mẹ hoặc người giám hộ để theo dõi việc con họ sử dụng trang web
              của chúng tôi.{'\n'}
              <Text style={styles.text}>
                XIII. Các thông tin mà bạn công khai hoặc đưa cho người khác
              </Text>
              {'\n'}
              Nếu bạn hiển thị thông tin cá nhân với những người khác, chúng tôi
              không thể kiểm soát hoặc nhận trách nhiệm về cách họ sẽ sử dụng
              hay quản lý dữ liệu đó. Có rất nhiều cách để bạn hiển thị thông
              tin tới người khác, như là khi bạn đăng tải các tin nhắn trên các
              diễn đàn, chia sẻ thông tin qua các mạng xã hội, hoặc liên lạc với
              nười sử dụng khác dù là qua trang web chúng tôi hoặc trực tiếp qua
              email. Trước khi công khai thông tin cá nhân của bạn hoặc đưa
              thông tin đó cho bất kì ai khác, hãy suy nghĩ cẩn thận. Nếu bạn
              đưa thông tin cho người dùng khác thông qua trang web của chúng
              tôi, hãy hỏi họ xem họ sẽ xử lí thông tin của bạn như thế nào. Nếu
              bạn chia sẻ các thông tin của bạn qua một website khác, hãy kiểm
              tra chính sách riêng tư của trang web đó để hiểu rõ cách họ quản
              lý thông tin của bạn khi mà chính sách riêng tư của trang web
              chúng tôi sẽ không được áp dụng.
              {'\n'}
              <Text style={styles.text}>
                XIV. Chúng tôi giữ thông tin cá nhân của bạn trong bao lâu?
              </Text>
              {'\n'}
              Chúng tôi sẽ giữ thông tin cá nhân của bạn ở mức cần thiết để cung
              cấp dịch vụ cho bạn và các bên khác, và để tuân thủ các nghĩa vụ
              pháp lý của chúng tôi. Nếu bạn không muốn chúng tôi giữ thông tin
              của bạn nữa hoặc muốn chúng tôi dừng cung cấp dịch vụ Edubit cho
              bạn, bạn có thể yêu cầu chúng tôi xóa dữ liệu cá nhân của bạn và
              đóng tài khoản Edubit.{'\n'} Hãy chú ý rằng nếu bạn yêu cầu xóa bỏ
              dữ liệu của bạn, chúng tôi sẽ giữ lại thông tin từ các tài khoản
              đã xóa để phục vụ cho lợi ích hợp pháp của chúng tôi, để tuân thủ
              luật pháp, ngăn chặn lừa đảo, thu phí, giải quyết tranh chấp, khắc
              phục sự cố, hỗ trợ điều tra, thực thi các điều khoản dịch vụ, và
              các hành động khác được cho phép bởi luật pháp. Thông tin chúng
              tôi lưu giữ sẽ được xử lý theo Chính sách riêng tư này.{'\n'}
              <Text style={styles.text}>
                XV. Khi nào chúng tôi cập nhật chính sách này?
              </Text>
              {'\n'}
              Chúng tôi sẽ cần phải thay đổi chính sách này theo thời gian để
              đảm bảo nó luôn được cập nhật với các yêu cầu pháp lý mới nhất và
              bất kỳ thay đổi nào đối với thực tiễn quản lý quyền riêng tư của
              chúng tôi. Khi chúng tôi thay đổi chính sách, chúng tôi sẽ đảm bảo
              thông báo cho bạn về các thay đổi. Bản sao của phiên bản mới nhất
              của chính sách này sẽ luôn có sẵn trên trang này.{'\n'}
              <Text style={styles.text}>
                XVI. Liên hệ với chúng tôi thế nào?
              </Text>
              {'\n'}
              Nếu bạn có bất kỳ câu hỏi nào về thực tiễn bảo mật của chúng tôi
              hoặc cách chúng tôi quản lý thông tin cá nhân của bạn, vui lòng
              liên hệ với chúng tôi qua email cskh@edubit.com.{'\n'} Chúng tôi
              rất vui vì bạn đã đọc đến cuối chính sách riêng tư, vì biết đây là
              cách tốt nhất để hiểu cách thông tin cá nhân của bạn được sử dụng.
              {'\n'} Nếu bạn là người dùng hoặc truy cập từ Khu vực Kinh tế Châu
              Âu (EEA), những điều khoản này sẽ được áp dụng với bạn. Nhằm mục
              đích áp dụng điều luật về bảo về dữ liệu của Liên minh Châu Âu
              (bao gồm Điều luật về Bảo vệ Dữ Liệu Chung 2016/679 (còn gọi là
              "GDPR"), chúng tôi là đơn vị "kiểm soát dữ liệu" cho các dữ liệu
              cá nhân của bạn.{'\n'}
              <Text style={styles.text}>
                XVII. Làm thế nào bạn có thể tiếp cận với thông tin cá nhân của
                bạn?
              </Text>
              {'\n'}
              Bạn cũng có quyền yêu cầu chúng tôi chuyển thông tin cá nhân của
              bạn (tức là chuyển sang định dạng có cấu trúc, thường được sử dụng
              và có thể đọc được bằng máy cho bạn), để xóa hoặc hạn chế xử lý
              của nó. Bạn cũng có quyền phản đối một số quy trình dựa trên lợi
              ích hợp pháp của chúng tôi, chẳng hạn như hồ sơ chúng tôi thực
              hiện cho mục đích Marketing và, nơi chúng tôi đã yêu cầu bạn đồng
              ý xử lý dữ liệu của bạn, được mô tả đầy đủ bên dưới.{'\n'} Các
              quyền này bị hạn chế trong một số trường hợp - ví dụ, chúng tôi có
              thể chứng minh rằng chúng tôi có một yêu cầu pháp lý để xử lý
              thông tin cá nhân của bạn. Trong một số trường hợp, điều này có
              nghĩa là chúng tôi có thể giữ lại một số dữ liệu ngay cả khi bạn
              rút lại sự đồng ý của mình.{'\n'} Trong trường hợp chúng tôi yêu
              cầu thông tin cá nhân của bạn tuân thủ các nghĩa vụ pháp lý hoặc
              hợp đồng thì việc cung cấp dữ liệu đó là bắt buộc: nếu dữ liệu đó
              không được cung cấp, chúng tôi sẽ không thể quản lý mối quan hệ
              hợp đồng của chúng tôi với bạn hoặc để đáp ứng các nghĩa vụ của
              chúng tôi. Trong tất cả các trường hợp khác, việc cung cấp thông
              tin cá nhân được yêu cầu là tùy chọn.{'\n'} Nếu bạn có những lo
              ngại chưa được giải quyết, bạn cũng có quyền khiếu nại với cơ quan
              bảo vệ dữ liệu. Cơ quan bảo vệ dữ liệu có liên quan sẽ là cơ quan
              bảo vệ dữ liệu của quốc gia: (i) nơi cư trú thường trú của bạn;
              (ii) địa điểm làm việc của bạn; hoặc (iii) trong đó bạn cho rằng
              vi phạm bị cáo buộc đã xảy ra.{'\n'} Cả thông tin cá nhân và dữ
              liệu cá nhân đều có cùng ý nghĩa trong Chính sách riêng tư này.
              {'\n'} Trân Trọng!{'\n'}
            </Text>
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: scale(22),
                color: colors.blue3,
                textAlign: 'center',
                fontWeight: 'bold',
                marginVertical: 5,
              }}>
              ĐIỀU KHOẢN SỬ DỤNG
            </Text>
            <Text style={{fontSize: scale(14), color: 'black'}}>
              Bằng việc đăng ký sử dụng dịch vụ của Edubit (sau đây gọi tắt là
              "dịch vụ") hay các dịch vụ trên các tên miền phụ của Edubit, bạn
              được hiểu là đồng ý với các điều khoản và điều kiện dưới đây (gọi
              tắt là "điều khoản dịch vụ"). Các tính năng hoặc ứng dụng của
              Edubit cũng tuân thủ theo điều khoản dịch vụ này. Bạn có thể xem
              lại bản điều khoản dịch vụ mới nhất bất kì lúc nào tại đây. Edubit
              có quyền hạn và nghĩa vụ cập nhật tất cả những thông tin thay đổi
              về điều khoản dịch vụ tại trang website chính của Edubit. Điều
              khoản này sẽ được dẫn chiếu trong hợp đồng dịch vụ của Edubit và
              có giá trị pháp lý trong trường hợp tranh chấp.
              {'\n'} Chúng tôi đề xuất bạn nên kiểm tra và quay lại đây đọc các
              điều khoản dịch vụ để biết được những thay đổi mới và có thể ảnh
              hưởng tới bạn. Nếu bạn có bất kì thắc mắc hay góp ý nào về điều
              khoản dịch vụ của Edubit, vui lòng liên hệ với chúng tôi để được
              làm rõ. Nếu bạn có phản đối với bất kì điều khoản hay điều kiện
              nào, vui lòng không sử dụng dịch vụ của Edubit để tránh khỏi những
              ràng buộc và tranh chấp có thể phát sinh.{'\n'} Bạn cần đọc và
              đồng ý với toàn bộ điều khoản dịch vụ dưới đây trước khi sử dụng
              dịch vụ của Edubit.
              {'\n'}
              <Text style={styles.text}>
                I. Điều khoản về tài khoản và người dùng{' '}
              </Text>
              {'\n'}
              Bạn phải lớn hơn 18 tuổi để sử dụng dịch vụ của Edubit. Trong suốt
              quá trình sử dụng, bạn cần đảm bảo đủ điều kiện sử dụng dịch vụ
              của Edubit trước pháp luật.{'\n'}
              Bạn phải cung cấp đầy đủ họ và tên, số điện thoại và email chính
              xác cùng những thông tin liên quan cần thiết để được hưởng đầy đủ
              chính sách hỗ trợ người dùng của Edubit.{'\n'}
              Bạn cần biết rằng Edubit sẽ sử dụng email của bạn như là một
              phương pháp giao tiếp chính giữa hai bên.{'\n'}
              Bạn có nghĩa vụ phải bảo vệ mật khẩu đăng nhập của chính mình.
              Edubit không cam kết bồi thường bất kì thiệt hại nào cho người
              dùng nếu như việc đó xuất phát từ việc bạn không bảo mật cho mật
              khẩu đăng nhập của chính mình.{'\n'}
              Bạn chịu toàn bộ trách nhiệm về dữ liệu, hình ảnh, báo cáo liên
              quan tới nội dung học và học viên trên website dạy học trực tuyến
              của bạn hay các công cụ khác liên kết tới website này. Bạn không
              được đưa virus hay đoạn mã nào gây ảnh hưởng tới người khác hoặc
              khai thác thông tin người dùng một cách trái phép.{'\n'}
              Bất kì vi phạm nào liên quan tới điều khoản sử dụng sẽ trao cho
              Edubit chấm dứt ngay dịch vụ mà bạn đang dùng trên nền tảng Edubit
              dưới bất kì hình thức nào. Edubit có quyền dẫn chiếu tới các điều
              khoản bạn vi phạm trong trường hợp tranh chấp và khiếu nại.{'\n'}
              <Text style={styles.text}>
                II. Phạm vi điều chỉnh của điều khoản dịch vụ
              </Text>
              {'\n'}
              Người sở hữu tài khoản quản trị website sẽ chịu trách nhiệm với
              toàn bộ điều khoản dịch vụ, trong phạm vi dịch vụ được Edubit cung
              cấp.{'\n'}
              Các tài khoản quản trị khác được cấp quyền bởi người sở hữu tài
              khoản quản trị gốc có trách nhiệm tuần thủ theo điều khoản dịch vụ
              này.{'\n'}
              Tài khoản học viên trên website dạy học trực tuyến tuân thủ theo
              những quy định và điều khoản do người sở hữu tài khoản quản trị
              gốc cung cấp. Edubit không chịu trách nhiệm liên đới khi có bất kì
              vi phạm nào liên quan đến pháp luật do các tài khoản học viên gây
              ra.{'\n'}
              <Text style={styles.text}>III. Điều kiện chung</Text>
              {'\n'}
              Khi đăng ký tạo trường trên Edubit, bạn được xem là đã đọc và đồng
              ý với toàn bộ điều khoản sử dụng dịch vụ dưới đây của Edubit:
              {'\n'}
              Hỗ trợ kĩ thuật được cam kết cung cấp đầy đủ theo từng gói dịch vụ
              của Edubit. Các hoạt động hỗ trợ ngoài gói dịch vụ bạn đang sử
              dụng là không bắt buộc đối với Edubit.{'\n'}
              Bạn không được quyền sử dụng dịch vụ của Edubit cho bất kỳ hoạt
              động nào phạm pháp. Điều này áp dụng với luật của từng nước nơi
              bạn kinh doanh cũng như luật quốc tế.{'\n'}
              Bạn không được quyền sao chép, phân phối lại, bán, tạo các sản
              phẩm phát sinh, dịch ngược, đảo ngược kỹ thuật hoặc tháo rời các
              dịch vụ Edubit cung cấp. Bạn cũng không được phép dùng bất kì biện
              pháp nào để can thiệp hoặc làm hỏng dịch vụ của Edubit. Bạn phải
              bồi thường những tổn thất cho Edubit khi bạn thương mại hóa dịch
              vụ của Edubit cho 1 bên thứ ba mà không được sự cho phép đến từ
              Edubit.{'\n'}
              Bạn không được quyền sử dụng bất kì hình ảnh bản quyền, logo hay
              bất kỳ sản phẩm có thương hiệu của Edubit để truyền thông, quảng
              cáo hay nhằm mục đích thương mại mà chưa được sự cho phép của
              Edubit.{'\n'}
              Edubit chỉ trả lời các câu hỏi về Điều khoản dịch vụ của bạn qua
              email cskh@edubit.com. Mọi giải thích, trao đổi qua các kênh thông
              tin khác đều chỉ có giá trị tham khảo và không được dùng để dẫn
              chiếu khi xảy ra tranh chấp.{'\n'}
              Bạn cần được hiểu là mọi thông tin nội dung trên website của bạn
              (không bao gồm các thông tin được bảo vệ trong điều khoản Bảo mật)
              sẽ không được mã hóa bảo mật.{'\n'}
              <Text style={styles.text}>Quyền của Edubit</Text>
              {'\n'}
              Chúng tôi có quyền sửa đổi hoặc chấm dứt Dịch vụ vì việc vi phạm
              bất kỳ lý do nào trong điều khoản dịch vụ này, mà không cần thông
              báo trước.{'\n'}
              Edubit có quyền từ chối cung cấp dịch vụ cho bất kỳ cá nhân, tổ
              chức nào với bất kỳ lý do nào.{'\n'}
              Edubit có quyền ngừng cung cấp dịch vụ và khóa bất kỳ tài khoản
              nào có hành vi, dấu hiệu hay bằng chứng gây tổn hại tới khách hàng
              của Edubit, nhân viên của Edubit, Công Ty Cổ Phần Đào Tạo Trực
              Tuyến Unica.{'\n'}
              Chúng tôi không tiến hành xem trước hay kiểm duyệt bất kỳ nội
              dung, thông tin nào trên website của người dùng. Người sở hữu tài
              khoản quản trị website chịu mọi trách nhiệm liên quan tới nội dung
              do họ cung cấp và đăng tải trên website của họ.{'\n'}
              Edubit có quyền cung cấp dịch vụ cho đối thủ cạnh tranh trực tiếp
              hoặc gián tiếp của bạn và không tiến hành cam kết độc quyền cho
              bất kỳ bên đối tác nào trong bất kỳ thị trường nào.{'\n'}
              Trong trường hợp có tranh chấp đền quyền sở hữu tài khoản, Edubit
              có toàn quyền yêu cầu cung cấp bằng chứng để chứng thực quyền sở
              hữu tài khoản của bạn. Các bằng chứng này có thể bao gồm, và không
              giới hạn ở: những giấy tờ bản gốc hoặc sao chép về giấy phép kinh
              doanh của bạn, thẻ căn cước hoặc chứng minh thư nhân dân, hộ
              chiếu, các bản sao kê chuyển khoản thanh toán dịch vụ của ngân
              hàng,...{'\n'}
              Edubit có quyền quyết định về quyền sở hữu hợp pháp đối với tài
              khoản và có thể chuyển quyền này đến người sở hữu hợp lệ. Trong
              trường hợp không xác định được quyền sở hữu chính xác đối với tài
              khoản và website, Edubit sẽ khóa tài khoản và dừng mọi hoạt động
              trên website cho đến khi xác định được kết luận giữa tranh chấp
              của các bên đối với quyền sở hữu tài khoản.{'\n'}
              <Text style={styles.text}>
                V. Giới hạn trách nhiệm của Edubit
              </Text>
              {'\n'}
              Bạn phải hiểu rõ và đồng ý rằng Edubit sẽ không chịu trách nhiệm
              cho bất kỳ thiệt hại nào, do là trực tiếp, gián tiếp, chủ quan hay
              ngẫu nhiên, đặc biệt là các thiệt hại liên quan tới doanh thu, lợi
              nhuận, uy tín, quyền sử dụng, dữ liệu và các thiệt hại vô hình
              khác khi cung cấp dịch vụ.{'\n'}
              Trong mọi trường hợp, Edubit hoặc nhà cung cấp dịch vụ gián tiếp,
              đối tác của chúng tôi sẽ không phải chịu trách nhiệm về những
              thiệt hại liên quan tới lợi nhuận do hậu quả phát sinh từ việc kết
              nối bị gián đoạn đến trang website của chúng tôi, dịch vụ của
              chúng tôi hay thỏa thuận này. Bạn cũng cần hiểu rằng những cá nhân
              liên quan trực tiếp tới Edubit như Công Ty Cổ Phần Đào Tạo Trực
              Tuyến Unica, đối tác của Edubit, nhân viên của Edubit,... cũng
              không chịu trách nhiệm về các thiệt hại nêu trên. Nếu bạn sử dụng
              dịch vụ do đối tác thứ ba cung cấp, họ có trách nhiệm cam kết với
              bạn và thực hiện theo những cam kết đó.{'\n'} Edubit cam kết cung
              cấp đầy đủ và liên tục dịch vụ theo gói giá được công bố trên
              website của Edubit trong thời gian bạn chi trả cho dịch vụ. Chúng
              tôi không có trách nhiệm buộc phải bảo hành hay duy trì dịch vụ
              sau khi bạn dừng hoặc chấm dứt dịch vụ chủ động hay bị động bởi
              bất kỳ lý do nào khác.{'\n'} Các cam kết liên quan tới tính liên
              tục của dịch vụ và bảo mật, tính năng khác của Edubit được quy
              định rõ trong từng gói dịch vụ. Edubit không chịu trách nhiệm về
              bất kỳ tính năng nào khác, hay bảo mật, tính liên tục của dịch vụ
              nằm ngoài quy định hay gói dịch vụ mà chúng tôi công bố.{'\n'}{' '}
              Edubit không đảm bảo và chịu trách nhiệm cho các kết quả thu về từ
              việc sử dụng Dịch vụ của chúng tôi được công bố trên website hay
              bất kỳ kênh truyền thông nào khác là chính xác và đáng tin cậy.
              Các kết quả có thể mang tính chất thời điểm và phụ thuộc nhiều vào
              các yếu tố khách quan của thị trường, luật lệ khác. {'\n'}Bất kỳ
              vấn đề hay lỗi phát sinh nào trong quá trình sử dụng sản phẩm và
              dịch vụ của Edubit sẽ được khắc phục trong điều kiện cho phép.
              Edubit không đảm bảo bất kỳ kì vọng nào mà bạn mong đợi trong quá
              trình sử dụng sẽ được đáp ứng chính xác ngoài những tính năng và
              dịch vụ mà chúng tôi cung cấp theo gói. Các thỏa thuận khác nằm
              ngoài điều khoản này chỉ có giá trị khi có sự trao đổi và đồng
              thuận giữa Edubit và người dùng.{'\n'}
              <Text style={styles.text}>VI. Từ bỏ và hoàn tất cam kết</Text>
              Nếu Edubit có sai xót hoặc làm không đúng bất kỳ điều khoản nào đã
              ghi trong bản điều khoản sử dụng này, không có nghĩa là điều đó bị
              hủy bỏ. Điều khoản sử dụng này được xem như là sự đồng ý toàn bộ
              giữa bạn và Edubit và chi phối việc bạn sử dụng Dịch vụ của chúng
              tôi (không giới hạn ở bất kỳ phiên bản nào của Điều khoản dịch vụ
              sử dụng này).
              {'\n'}
              <Text style={styles.text}>
                VII. Sở hữu trí tuệ và Nội dung của khách hàng
              </Text>
              {'\n'}
              Nếu Edubit có sai xót hoặc làm không đúng bất kỳ điều khoản nào đã
              ghi trong bản điều khoản sử dụng này, không có nghĩa là điều đó bị
              hủy bỏ. Điều khoản sử dụng này được xem như là sự đồng ý toàn bộ
              giữa bạn và Edubit và chi phối việc bạn sử dụng Dịch vụ của chúng
              tôi (không giới hạn ở bất kỳ phiên bản nào của Điều khoản dịch vụ
              sử dụng này).{'\n'} Bằng việc tải lên nội dung của mình trên
              website dạy học trực tuyến do bạn sở hữu, bạn đã đồng ý:{'\n'} Cho
              phép người dùng Internet khác xem nội dung trên website của mình.
              {'\n'} Cho phép học viên truy cập bài giảng, khóa học trên website
              dạy học trực tuyến của mình{'\n'} Edubit được quyền hiển thị và
              lưu trữ nội dung đã đăng tải. Edubit có quyền truy cập và tùy
              chỉnh những dữ liệu bạn đăng lên để đảm bảo tính phù hợp và thống
              nhất với hệ thống của chúng tôi.{'\n'} Bạn có quyền sở hữu toàn bộ
              nội dung trên website của mình cho dù đó là nội dung đăng tải trực
              tiếp hay dẫn nguồn gián tiếp qua các liên kết (links) tới Edubit.
              Khi bạn đưa những nội dung này lên website của mình đồng nghĩa với
              việc bạn cho phép người khác truy cập và tiếp cận những nội dung
              này. Bạn cũng chịu toàn bộ trách nhiệm cho những nội dung bạn đưa
              lên có phù hợp với Pháp luật hay không.{'\n'} Edubit cam kết không
              tiết lộ bất kỳ thông nào của bạn hay thương mại hóa, sử dụng nội
              dung, thương hiệu của bạn mà không được sự cho phép. Trừ trường
              hợp cần thông tin để giải quyết tranh chấp quyền sử dụng, hay các
              vấn đề pháp lý. Thông tin bảo mật trong cam kết bao gồm các thông
              tin tài khoản, thông tin cá nhân, thông tin về học viên và các dữ
              liệu nằm trong phạm vi bảo mật của Edubit. Thông tin bảo mật không
              bao gồm:{'\n'}
              Các thông tin đã được công chúng hóa và truyền thông rộng rãi
              trước khi bạn sử dụng Dịch vụ của Edubit{'\n'} Các thông tin được
              cung cấp trên mạng internet bởi bất kỳ bên nào khác mà không có
              lưu ý về việc trích dẫn hay bản quyền.{'\n'} Thông tin được cho
              phép công bố bởi bạn.{'\n'} Thông tin được yêu cầu cung cấp bởi
              luật pháp hoặc các cơ quan luật pháp.
              {'\n'}
              <Text style={styles.text}>VIII. Tính năng</Text>
              {'\n'}
              Bạn có quyền tùy chỉnh giao diện, font chữ, màu nền và ảnh nền
              trên trang website của bạn theo ý muốn của chính bạn. Edubit không
              tiến hành kiểm tra và không chịu trách nhiệm về những thay đổi do
              bạn tự điều chỉnh. Tuy nhiên, nếu có bất kì lỗi nào xảy ra do việc
              xung đột giữa các đoạn mã tùy chỉnh và hệ thống của Edubit, Edubit
              sẽ khắc phục những lỗi này trong khả năng của chúng tôi và chúng
              tôi không chịu trách nhiệm về những thiệt hại gây ra do những hoạt
              động này.{'\n'} Các tính năng mà Edubit cung cấp cho bạn nằm trong
              gói dịch vụ mà bạn đang sử dụng với Edubit. Bất kì thay đổi nào về
              tính năng trong gói dịch vụ chúng tôi sẽ thông báo cho bạn qua
              email trong vòng 30 ngày. Bạn có thể có quyền sử dụng một số tính
              năng mới sau mỗi bản cập nhật mà chúng tôi có thông báo với bạn
              qua mail. Tuy nhiên, chúng tôi không có trách nhiệm duy trì những
              tính năng này nếu chúng không có trong gói dịch vụ tại thời điểm
              bạn sử dụng dịch vụ của Edubit theo bảng giá tại thời điểm đó.
              {'\n'} Đối với tính năng bảo mật, bạn có quyền lựa chọn hoặc hủy
              bỏ bảo mật với các nội dung bài giảng với định dạng video trên
              website dạy học trực tuyến của bạn. Edubit sẽ chịu trách nhiệm mã
              hóa và đảm bảo các nghiệp vụ để bảo vệ bài giảng video của bạn
              khỏi (a) tải xuống, (b) quay màn hình và (c) truy cập bởi nhiều
              người khác nhau trong khả năng của Edubit. Chúng tôi không có
              trách nhiệm bảo vệ bài giảng của bạn trong các trường hợp sau: (c)
              bạn không bật tính năng bảo mật trong cài đặt, (d) định dạng bài
              giảng của bạn không được hỗ trợ, (e) bài giảng của bạn được đăng
              tải hay lữu trữ trên một nền tảng khác nằm ngoài Dịch vụ do Edubit
              cung cấp, (f) các trường hợp khác nằm ngoài những điểm (a), (b),
              (c) đã nêu ở trên.{'\n'}
              Các tính năng đi theo gói dịch vụ cụ thể và không thể tách rời.
              Edubit không có trách nhiệm cung cấp các tính năng nằm ngoài gói
              dịch vụ mà bạn đang sử dụng cũng như tính năng không có trong gói
              dịch vụ. Nếu bạn mong muốn chức năng ở gói dịch vụ cao hơn, vui
              lòng nâng cấp để sử dụng. Nếu bạn mong muốn chức năng không có
              trong phần bảng giá, vui lòng liên hệ Edubit để được nhận tư vấn
              và báo giá.{'\n'} Với các tính năng tích hợp từ bên đối tác thứ ba
              khác, Edubit không chi trả cho các chi phí phát sinh khi bạn sử
              dụng các tính năng này, chúng tôi không có trách nhiệm nào khác
              ngoài nghĩa vụ kết nối giữa người sở hữu website và các bên cung
              ứng tính năng tích hợp. Tất cả chi phí phát sinh hay thiệt hại có
              thể xảy ra nằm ngoài nghĩa vụ, trách nhiệm của Edubit và Edubit sẽ
              không bồi thường cho bất kỳ thiệt hại hay tổn thất nào xảy ra khi
              bạn sử dụng tính năng được tích hợp của bên khác trên hệ thống của
              Edubit.{'\n'} Với các hành động, thao tác tùy chỉnh tính năng nằm
              ngoài thông báo của Edubit và do bất kỳ ai khác ngoài Edubit gây
              ra, chúng tôi không chịu trách nhiệm với bất kỳ tổn thất hay chi
              phí phát sinh xảy ra bởi các hoạt động này. Bạn vui lòng liên hệ
              với các phía đối tác cung cấp dịch vụ để làm rõ trách nhiệm của họ
              trước khi tiến hành điều chỉnh website dạy học trực tuyến của
              mình. Các đoạn mã hay dữ liệu đăng tải lên hệ thống Edubit nếu gây
              ra những xung đột hoặc tổn hại tới hệ thống hiện tại sẽ được gỡ bỏ
              mà không cần báo trước.
              {'\n'}
              <Text style={styles.text}>IX. Đội ngũ hỗ trợ của Edubit</Text>
              {'\n'}
              Đội ngũ hỗ trợ của Edubit là những nhân viên hoặc những người được
              Edubit chứng nhận làm các công việc liên quan tới hỗ trợ khách
              hàng sử dụng sản phẩm và dịch vụ của Edubit. Các đội ngũ kĩ thuật
              khác nằm ngoài đối tượng kể trên hoặc chưa nhận được sự chấp
              thuận, đồng ý của Edubit sẽ không được tính vào đội ngũ hỗ trợ của
              chúng tôi.{'\n'} Edubit chỉ hỗ trợ qua email, điện thoại, hỗ trợ
              trực tiếp, live-chat trên website Edubit.com và qua inbox fanpage.
              Tùy thuộc vào gói dịch vụ bạn sử dụng mà một không hình thức hỗ
              trợ hay thời gian hỗ trợ trong ngày sẽ không khả dụng cho tài
              khoản của bạn. Các hỗ trợ khác nằm ngoài định nghĩa này và nằm
              ngoài đối tượng nêu ở mục IX.1 sẽ không nằm trong trách nhiệm của
              Edubit.{'\n'} Edubit có quyền không hỗ trợ trong các trường hợp
              sau:{'\n'}
              Bạn không phải là người sở hữu tài khoản quản trị của trường{'\n'}
              Bạn liên hệ qua các hình thức hoặc đối tượng không nằm trong điều
              IX.1 và IX.2{'\n'} Thời gian hỗ trợ nằm ngoài phạm vi trách nhiệm
              của Edubit{'\n'} Yêu cầu hỗ trợ của bạn nằm ngoài các tính năng đã
              được quy định trong mục XIII{'\n'} Trường của bạn đang trong tình
              trạng tranh chấp quyền sở hữu hoặc bị khóa vì bất kỳ lý do nào
              {'\n'} Bất kể hoạt động nào vi phạm Pháp luật hoặc Điều khoản dịch
              vụ này{'\n'} Chúng tôi không có trách nhiệm hỗ trợ các tài khoản
              học viên hay người sử dụng website của bạn một cách trực tiếp hay
              gián tiếp nào khác. Khi gặp bất kỳ vấn đề nào trục trặc hoặc lỗi
              kĩ thuật, Edubit chỉ có nghĩa vụ và trách nhiệm trả lời người sở
              hữu tài khoản quản trị website dạy học trực tuyến. Các đối tượng
              người dùng khác khi gửi yêu cầu hỗ trợ về Edubit có thể nhận được
              giải đáp trong một số trường hợp. Tuy nhiên, chúng tôi không chịu
              trách nhiệm hay có nghĩa vụ phải trả lời cũng như hỗ trợ cho đối
              tượng khác ngoài người sở hữu tài khoản quản trị website.
              {'\n'}
              <Text style={styles.text}>X.Thanh toán chi phí</Text>
              {'\n'}
              Bạn có thể trả tiền chi phí dịch vụ cho Edubit bằng tiền mặt hoặc
              chuyển tiền trực tiếp cho chúng tôi thông qua các cổng thanh toán
              trực tuyến, các phương thức thanh toán được cung cấp trên Edubit.
              {'\n'}
              Sau khi thanh toán, hệ thống sẽ gửi thông báo tới email và kích
              hoạt dịch vụ cho bạn tự động cho website liên kết với tài khoản
              email mà bạn đăng ký hoặc tài khoản email chủ trường do bạn cài
              đạt. Hệ thống sẽ gửi thông báo gia hạn gói dịch vụ tự động tới
              email của bạn trong vòng 5 ngày trước thời điểm hết hạn gói dịch
              vụ. Sau thời gian này, website dạy học trực tuyến của bạn sẽ tự
              động bị khóa và chỉ có thể truy cập trở lại sau khi bạn đã tiến
              hành thanh toán. Sau 6 tháng mà bạn không tiến hành gia hạn hay sử
              dụng gói dịch vụ nào khác của Edubit, chúng tôi có quyền xóa
              trường của bạn và không có trách nhiệm lưu trữ hay khôi phục bất
              kì dữ liệu nào bạn đã đăng tải lên hệ thống mà không cần thông
              báo.{'\n'}
              Số tiền thanh toán bằng đơn giá gói dịch vụ bạn đăng ký nhân với
              số tháng dịch vụ bạn mong muốn sử dụng. Bạn có thể nhận được một
              số chương trình khuyến mại, giảm trừ chi phí, chiết khấu và được
              trừ trực tiếp vào số tiền thanh toán theo tỉ lệ % hoặc số tiền
              tuyệt đối. Đối với các chương trình tặng thời gian sử dụng, bạn sẽ
              không phải chi trả bất kỳ chi phí phát sinh nào nếu thực hiện đúng
              theo những thỏa thuận của chương trình. Nếu Edubit phát hiện bất
              kỳ vi phạm nào của bạn với các điều kiện cụ thể của từng chương
              trình khuyến mãi, chúng tôi có quyền dừng cung cấp Dịch vụ và yêu
              cầu bạn đền bù tổn thất phát sinh do vi phạm của bạn.{'\n'}
              Chúng tôi không có trách nhiệm trả các khoản phí, thuế phát sinh
              từ hoạt động của bạn. Giá công bố trên bảng giá của Edubit chưa
              bao gồm VAT và các khoản miễn trừ hay chi phí phát sinh khác.
              {'\n'}
              Edubit không có chính sách hoàn trả phí với bất kỳ lý do nào ở
              thời điểm hiện tại.
              {'\n'}
              <Text style={styles.text}>XI. Tất toán</Text>
              {'\n'}
              Tất toán là hoạt động đối soát doanh thu của bạn để tính % hoa
              hồng mà Edubit sẽ nhận được theo gói Dịch vụ bạn đang sử dụng cũng
              như số tiền mà Edubit đã thu hộ bạn trong tháng. Nếu số tiền
              Edubit giữ lớn hơn số tiền hoa hồng mà chúng tôi nhận, bạn sẽ nhận
              được phần tiền chênh lệch này. Trong trường hợp ngược lại, khi
              tiền trên hệ thống ít hơn số tiền hoa hồng, bạn cần tất toán khoản
              tiền này cho Edubit để tiếp tục sử dụng dịch vụ.{'\n'}
              Edubit sẽ tiến hành gửi thông báo tất toán cho bạn trong vòng 5
              ngày đầu tiên của tháng kế tiếp. Trong trường hợp bạn phải thanh
              toán tiền cho Edubit, trong vòng 15 ngày kể từ khi nhận thông báo
              tất toán, nếu bạn không tiến hành tất toán cho chúng tôi trong
              khoản thời gian này, Edubit có quyền dừng cung cấp Dịch vụ cho bạn
              mà không cần thông báo.{'\n'}
              Nếu có bất kỳ sự cố nào gây chậm trễ trong quá trình tất toán giữa
              Edubit và bạn, chúng tôi sẽ thông báo cho bạn trong vòng 15 ngày
              làm việc và sẽ giải quyết cũng như tiến hành tất toán cho bạn
              trong khoản thời gian sớm nhất có thể trong điều kiện của Edubit.
              {'\n'}
              Mọi thắc mắc, khiếu nại liên quan tới vấn đề tất toán sẽ được giải
              quyết qua email payment@Edubit.com. Bạn vui lòng liên hệ qua email
              này để được giải quyết.
              {'\n'}
              <Text style={styles.text}>XII. Hủy dịch vụ</Text>
              {'\n'}
              Bạn có thể hủy tài khoản của mình bất kỳ lúc nào bằng việc liên hệ
              với Edubit qua email hoặc số hot-line của chúng tôi. Chúng tôi sẽ
              gửi bạn các hướng dẫn chi tiết và hỗ trợ bạn hủy tài khoản cùng
              các dữ liệu có liên quan.{'\n'}
              Một khi lệnh hủy được xác nhận, tất cả nội dung trên website của
              bạn sẽ bị xóa ngay lập tức.{'\n'}
              Nếu bạn hủy Dịch vụ khi chưa hết hạn, bạn sẽ nhận được thông tin
              tất toán dịch vụ vào thời điểm hủy. Edubit không hoàn trả các
              khoản phí mà bạn đã trả trước cho Dịch vụ của chúng tôi.{'\n'}
              Khi bạn vi phạm Pháp luật hoặc Điều khoản dịch vụ này, Edubit có
              quyền thay đổi hoặc hủy bỏ Dịch vụ mà không cần thông báo. Trong
              các trường hợp khác, chúng tôi sẽ có gửi thông báo tới bạn qua
              email và sẽ ngừng cung cấp Dịch vụ sau 5 ngày nếu không nhận được
              phản hồi từ phía bạn.{'\n'}
              <Text style={styles.text}>XIII. Sửa đổi dịch vụ giá cả</Text>
              {'\n'}
              Chi phí cho việc sử dụng Edubit nếu có thay đổi sẽ được thông báo
              trước 30 ngày. Edubit có toàn quyền để thay đổi hoặc dừng dịch vụ.
              Edubit không chịu trách nhiệm về bạn hoặc bất kỳ đối tác thứ ba
              nào khi họ thay đổi về giá cả hay ngưng dịch vụ của chính họ.
              {'\n'}
              <Text style={styles.text}>XIV. Giới hạn trách nhiệm pháp lý</Text>
              {'\n'}
              Trong phạm vi tối đa được pháp luật cho phép, Edubit sẽ không chịu
              trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên,
              đặc biệt, hậu quả hoặc mang tính chất trừng phạt, bao gồm nhưng
              không giới hạn ở các thiệt hại về mất mát doanh thu, lợi nhuận, uy
              tín, sử dụng, dữ liệu Tổn thất vô hình do hậu quả của:{'\n'}
              Việc sử dụng hoặc không thể sử dụng website từ Edubit {'\n'}
              Bất kỳ các thay đổi nào được thực hiện đối với website của Edubit{' '}
              {'\n'}
              Truy cập không được phép hoặc biến đổi các dữ liệu{'\n'}
              Xóa, sai hỏng,hoặc không lưu trữ dữ liệu có trên hoặc thông qua
              website của Edubit{'\n'}
              Các tuyên bố hay hành vi của bất kỳ bên thứ ba nào đối với Edubit
              {'\n'}
              Bất kỳ vấn đề nào khác liên quan đến Edubit{'\n'}
              Các tiêu đề chỉ nhằm mục đích tiện lợi và sẽ không được sử dụng để
              diễn giải các điều khoản của Thỏa thuận này. Nếu bất kỳ điều khoản
              nào của Thỏa thuận này được phát hiện không hợp lệ hoặc không thể
              thi hành được bởi bất kỳ tòa án có thẩm quyền nào, thì điều khoản
              đó sẽ bị cắt đứt khỏi Thỏa thuận này.{'\n'}
              <Text style={styles.text}>
                XV. Hoa hồng, thuế thu nhập và thanh toán
              </Text>
              {'\n'}
              Mời bạn bè: Mọi thành viên Edubit (A) đều được quyền mời bạn bè
              (B) và được hưởng % cho mỗi user giới thiệu thành công (phần trăm
              do giảng viên thiết lập).{'\n'}
              Nếu A là Affiliate hoặc Agency: bất cứ khi nào B mua mới hoặc gia
              hạn dịch vụ tại Edubit thì A sẽ được hưởng hoa hồng.{'\n'}
              Hoa hồng: Hoa hồng được áp dụng cho từng loại đơn hàng: Đơn hàng
              mới, Đơn hàng gia hạn dịch vụ.{'\n'}
              Hoa hồng được ghi nhận khi đơn hàng thành công: Edubit nhận được
              thanh toán.{'\n'}
              Mức hoa hồng cụ thể được công bố tại: https://edubit.vn/affiliate
              {'\n'}
              Thuế thu nhập: Edubit sẽ khấu trừ thuế thu nhập cá nhân 10% đối
              với doanh thu đối tác đạt trên 2.000.000 VNĐ theo quy định của
              pháp luật {'\n'}
              Thanh toán: Khi ai đó vào Edubit.vn qua link giới thiệu của bạn,
              trong vòng 30 ngày, họ đăng ký trở thành thành viên thì thành viên
              đó được tính cho bạn.{'\n'}
              Nếu có nhiều người cùng giới thiệu 1 khách hàng, thì người giới
              thiệu cuối cùng sẽ được tính.{'\n'}
              Hoa hồng được tổng kết vào cuối tháng, và sẽ được thanh toán vào
              ngày 15 của tháng tiếp theo.{'\n'}
              Hạn mức thanh toán là 500.000 VNĐ. Nếu thu nhập của bạn chưa đạt
              mức thanh toán tối thiểu sẽ được cộng dồn sang tháng tiếp theo.
              {'\n'}
              Doanh nghiệp sẽ được thanh toán dựa trên hợp đồng và biên bản
              nghiệm thu đối soát Kênh nhận tiền hoa hồng: Ngân hàng (Cài đặt
              thanh toán){'\n'}
              Không ghi nhận hoa hồng: Một thành viên, một shop không được sử
              dụng nhiều tài khoản để giới thiệu lẫn nhau. Edubit sẽ không ghi
              nhận hoa hồng khi:{'\n'}A & B đã từng truy cập Edubit từ cùng 1
              địa chỉ IP {'\n'}A & B đã từng được phân quyềnvào cùng 1 shop
              {'\n'}
              <Text style={styles.text}>XVI. Tài liệu hướng dẫn sử dụng</Text>
              {'\n'}
              Người dùng Edubit có thể truy cập và tra cứu tài liệu hướng dẫn
              ngay trang Hướng dẫn sử dụng của Edubit: https://edubit.vn. Tuy
              nhiên, Edubit có thể sẽ không cung cấp cho người dùng bất kỳ hướng
              dẫn sử dụng nào dưới dạng văn bản in ấn. Tài liệu hướng dẫn sử
              dụng sẽ được Edubit gửi kèm với email xác nhận tài khoản ngay sau
              khi bạn đăng ký tài khoản thành công.{'\n'}
              <Text style={styles.text}>
                XVII. Giải quyết thắc mắc, khiếu nại, tranh chấp
              </Text>
              {'\n'}
              Phương thức tiếp nhận thắc mắc, khiếu nại: Mọi trường hợp đóng góp
              ý, thắc mắc, khiếu nại, của khách hàng vui lòng gửi về Edubit theo
              các phương thức sau:{'\n'}
              Hotline: 0904886098{'\n'}
              Email hỗ trợ:cskh@edubit.vn{'\n'}
              Địa chỉ: Tầng 3, số 247 Cầu Giấy, P.Dịch Vọng, Q.Cầu Giấy, TP.Hà
              Nội{'\n'}
              Địa chỉ: 323A Lê QuangĐịnh, TP HCM{'\n'}
              Tùy thuộc vào tính chất phức tạp của nội dung khiếu nại, Edubit sẽ
              có thời hạn xử lý tương ứng. Kết quả giải quyết khiếu nại sẽ được
              thông báo tới người dùng. Trong trường hợp cần thiết, Edubit có
              thể mời người khiếu nại tới làm việc trực tiếp.{'\n'}
              Công ty luôn nỗ lực để giải quyết các khiếu nại của khách hàng
              trong thời gian sớm nhất và trên tinh thần thương lượng, hòa giải,
              tôn trọng, hai bên cùng có lợi.{'\n'}
              Trường hợp xảy ra tranh chấp: Trong quá trình sử dụng nếu xảy ra
              tranh chấp giữa người sử dụng và Edubit, hai bên sẽ tiến hành đàm
              phán hòa giải với tinh thần hữu nghị. Trong trường hợp không giải
              quyết được bằng hòa giải sẽ đưa ra Toà án kinh tế Hà Nội giải
              quyết.{'\n'}
              Trân Trọng!{'\n'}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaViews>
  );
};

export default PrivacyPolicy;
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: scale(20),
  },
});
