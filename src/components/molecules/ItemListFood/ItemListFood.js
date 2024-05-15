import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Counter, Number, Rating} from '../Molecules';

const ItemListFood = ({
  type,
  onCounterChange,
  image,
  onPress,
  items,
  rating,
  totalHargaQuantity,
  CardpriceCard,
  totalHargaItem,
  name,
  date,
  price,
  status,
  description,
  onPressButtonDelete,
}) => {
  const [showImage, setShowImage] = useState(false);
  const handleClick = () => {
    setShowImage(true);
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const [changeText, setChangeText] = useState(true);
  const [modalVisiblePopUp, setModalVisiblePopUp] = useState(false);

  const [changeCard, setChangeCard] = useState(true);
  const [cardVisiblePopUp, setCardVisiblePopUp] = useState(false);

  const handleOpenModalPopUp = () => {
    setModalVisiblePopUp(true) == setChangeText(changeText);
  };
  const handleOpenCardPopUp = () => {
    setCardVisiblePopUp(true) == setChangeCard(changeCard);
  };

  const handleCloseModalPopUp = () => {
    setModalVisiblePopUp(false) == setChangeText(!changeText);
  };
  const handleCloseCardPopUp = () => {
    setCardVisiblePopUp(false) == setChangeCard(!changeCard);
  };
  let statusLabel;
  switch (status) {
    case 'menunggu_konfirmasi':
      statusLabel = 'Menunggu Konfirmasi';
      break;
    case 'batal':
      statusLabel = 'Batal';
      break;
    case 'sedang_diproses':
      statusLabel = 'Sedang Diproses';
      break;
    case 'siap_diantar':
      statusLabel = 'Siap Diantar';
      break;
    case 'sedang_dikirim':
      statusLabel = 'Sedang Diantar';
      break;
    case 'selesai':
      statusLabel = 'Selesai';
      break;
    default:
      statusLabel = 'Status Tidak Dikenal';
  }
  const renderContent = () => {
    switch (type) {
      case 'modal':
        return (
          <>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={handleCloseModal}>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButtonModal}
              />
              <View style={styles.modalContainerModal}>
                <View style={styles.modalBackground}>
                  <Image
                    style={styles.imageModal}
                    source={require('../image/ayambakar.jpg')}
                  />
                  <View style={styles.containerTitleModal}>
                    <Text style={styles.descriptionTitleModal}>Ayam Bakar</Text>
                  </View>
                  <View style={styles.containerDescriptionModal}>
                    <Text style={styles.textDescriptionModal}>
                      Ayam bakar adalah sebuah hidangan Asia Tenggara Maritim,
                      terutama hidangan Indonesia atau Malaysia, dari ayam yang
                      dipanggang di atas arang.
                    </Text>
                  </View>
                  <View style={styles.containerPriceModal}>
                    <Text style={styles.priceModal}>15.000</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonModalModal}
                    activeOpacity={0.5}>
                    <Text style={styles.buttonTambahModal}>Tambah Pesanan</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        );
      case 'card':
        return (
          <>
            <TouchableOpacity activeOpacity={0.4} onPress={handleOpenModal}>
              <View style={styles.containerCard}>
                <View style={styles.containerImage}>
                  <Image
                    source={require('../image/ayambakar.jpg')}
                    style={styles.imageCard}
                  />
                </View>
                <View style={styles.containerTitle}>
                  <Text style={styles.titleCard}>{name}</Text>
                </View>
                <View style={styles.containerDescription}>
                  <Text style={styles.description}>{description}</Text>
                </View>
                <View style={styles.containerPrice}>
                  {status === 'Tersedia' ? (
                    <Number number={price} style={styles.priceCard} />
                  ) : (
                    // <Text style={styles.habis}>Persediaan Habis</Text>
                    <Text style={styles.habis}> Habis</Text>
                  )}
                </View>
                <TouchableOpacity onPress={handleOpenModalPopUp}>
                  <View style={styles.containerButton}>
                    <Text style={styles.buttonCard}>Tambah</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </>
        );
      case 'product':
        return (
          <>
            <View style={styles.content}>
              <View style={styles.productContainer}>
                <Text style={styles.title}>{name}</Text>
                {status === 'Tersedia' ? (
                  <View style={styles.containerCounter}>
                    {!showImage ? (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleClick}>
                        <View style={styles.button}>
                          <Text style={styles.textButton}>Tambah</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleClick}>
                        <View style={styles.button}>
                          <Text style={styles.textButton}>1 item</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
              {status === 'Tersedia' ? (
                <Number number={CardpriceCard} style={styles.CardpriceCard} />
              ) : (
                <Text style={styles.habis}>Persediaan Habis</Text>
              )}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.closeButtonModal}
                />
                <View style={styles.modalContainerModal}>
                  <View style={styles.modalBackground}>
                    <Image
                      style={styles.imageModal}
                      source={require('../image/ayambakar.jpg')}
                    />
                    <View style={styles.containerTitleModal}>
                      <Text style={styles.descriptionTitleModal}>
                        Ayam Bakar
                      </Text>
                    </View>
                    <View style={styles.containerDescriptionModal}>
                      <Text style={styles.textDescriptionModal}>
                        Ayam bakar adalah sebuah hidangan Asia Tenggara Maritim,
                        terutama hidangan Indonesia atau Malaysia, dari ayam
                        yang dipanggang di atas arang.
                      </Text>
                    </View>
                    <View style={styles.containerPriceModal}>
                      <Text style={styles.priceModal}>15.000</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.buttonModalModal}
                      activeOpacity={0.5}>
                      <Text style={styles.buttonTambahModal}>
                        Tambah Pesanan
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </>
        );
      case 'order-summary':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={CardpriceCard} style={styles.CardpriceCard} />
            </View>
            <Text style={styles.items}>{items} items </Text>
          </>
        );
      case 'cart':
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={CardpriceCard} style={styles.CardpriceCard} />
            </View>
            <View style={styles.containerCounter}>
              <Counter onValueChange={onCounterChange} />
            </View>
            <View style={styles.totalHarga}>
              <Text>{totalHargaItem}</Text>
              {/* Menampilkan totalHargaItem */}
            </View>
            <TouchableOpacity
              style={styles.containerDelete}
              onPress={onPressButtonDelete}>
              <Image
                source={require('../image/delete.png')}
                style={styles.delete}
              />
            </TouchableOpacity>
            {/* <View style={styles.containerDelete}>
              <Number number={totalHargaQuantity} />
            </View> */}
          </>
        );
      case 'in-progress':
        // item in progress

        return (
          <>
            <View style={styles.content}>
              <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                <Text style={styles.title}>Order {name}</Text>
                <View style={styles.row}>
                  {/* <Text style={styles.CardpriceCard}>{price} items</Text>
                    <View style={styles.dot} /> */}
                  <Number number={CardpriceCard} style={styles.CardpriceCard} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.conta}>
              <Text style={styles.date}>{formatDate(date)}</Text>
              <Text style={styles.statusIn(status)}>{statusLabel}</Text>
            </View>
          </>
        );
      case 'past-orders':
        function formatDate(dateString) {
          const options = {year: 'numeric', month: 'long', day: 'numeric'};
          return new Date(dateString).toLocaleDateString(undefined, options);
        }
        return (
          <>
            <View style={styles.content}>
              <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                <Text style={styles.title}>Order {name}</Text>
                <View style={styles.row}>
                  {/* <Text style={styles.CardpriceCard}>{items} items</Text>
                    <View style={styles.dot} /> */}
                  <Number number={CardpriceCard} style={styles.CardpriceCard} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.conta}>
              <Text style={styles.date}>{formatDate(date)}</Text>
              <Text style={styles.status(status)}>{statusLabel}</Text>
            </View>
          </>
        );
      default:
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={CardpriceCard} style={styles.CardpriceCard} />
            </View>
            <Rating />
          </>
        );
    }
  };
  return (
    <View>
      {status === 'Tersedia' ? (
        <TouchableOpacity activeOpacity={(0, 7)} onPress={handleOpenModal}>
          <View style={styles.container}>
            <Image style={styles.image} source={image} />
            {renderContent()}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          {/* <Image style={styles.image} source={image} /> */}
          {renderContent()}
        </View>
      )}
    </View>
  );
};

export default ItemListFood;

const styles = StyleSheet.create({
  containerDelete: {
    alignItems: 'flex-end',
    // backgroundColor: 'red',
    marginLeft: 50,
  },
  delete: {
    width: 35,
    height: 35,
  },
  containerPriceModal: {
    width: 90,
    height: 17,
    left: 18,
    bottom: 15,
  },
  priceModal: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 17,
    color: '#000000',
  },
  containerDescriptionModal: {
    width: 355,
    height: 84,
    left: 18,
    justifyContent: 'center',
    bottom: 10,
  },
  containerTitleModal: {
    width: 93,
    height: 19,
    left: 18,
    top: 5,
  },
  textDescriptionModal: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: 'grey',
  },

  descriptionTitleModal: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#7A4141',
  // },

  buttonTambahModal: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  buttonModalModal: {
    backgroundColor: '#7A4141',
    color: 'white',
    padding: 10,
    bottom: 5,
    maxWidth: 400,
    height: 43,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 40,
    textAlign: 'center',
  },
  modalContainerModal: {
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: 10000,
    paddingTop: 10,
    borderRadius: 30,
    alignItems: 'stretch',
  },
  closeButtonModal: {
    backgroundColor: 'transparent',
    paddingEnd: 500,
    paddingBottom: 300,
    paddingTop: 200,
    justifyContent: 'flex-start',
  },
  modalBackground: {
    backgroundColor: 'white',
    paddingTop: 23,
  },
  imageModal: {
    width: 355,
    height: 250,
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
    right: 15,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  containerCounter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 60,
    height: 60,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '700',
    color: '#020202',
  },
  CardpriceCard: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#8D92A3',
  },
  items: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
  },
  habis: {
    color: 'red',
    fontWeight: '400',
  },
  status: status => ({
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: status === 'batal' ? '#D9435E' : '#1ABC9C',
  }),
  statusIn: status => ({
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: status === 'menunggu_konfirmasi' ? '#D9435E' : '#1ABC9C',
  }),
  conta: {
    backgroundColor: 'white',
    // paddingVertical: 9,
    paddingTop: 3,
    alignItems: 'flex-end',
  },
  date: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#8D92A3'},
  row: {flexDirection: 'row', alignItems: 'center'},
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#8D92A3',
    marginHorizontal: 4,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    backgroundColor: '#7A4141',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'flex-end',
  },
  textButton: {
    color: '#FAFAFA',
  },
  containerCard: {
    height: 85,
    top: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  containerImage: {
    top: 10,
    left: 5,
  },
  imageCard: {
    width: 102,
    height: 68,
    left: 11,
    borderRadius: 10,
  },
  containerTitle: {
    top: 5,
    left: 25,
  },
  titleCard: {
    fontWeight: '700',
    fontSize: 16,
    left: 11,
    color: 'black',
  },
  containerDescription: {
    top: 27,
    width: 177,
    height: 32,
    right: 48,
  },
  description: {
    fontWeight: '400',
    fontSize: 13,
  },
  containerPrice: {
    right: 225,
    top: 58,
  },
  priceCard: {
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
  },
  containerButton: {
    width: 65,
    height: 28,
    right: 110,
    top: 26,
    backgroundColor: '#7A4141',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonCard: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
});
