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

const ItemListHome = ({
  type,
  image,
  onPress,
  onPressTambah,
  name,
  quantity,
  types,
  price,
  status,
  description,
  valueName,
  valuePrice,
  isItemInCart,
  hari,
  jamBuka,
  jamTutup,
  onCounterChange,
  onPressPlus,
  onPressMinus,
  showCounter,
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
  const renderContent = () => {
    switch (type) {
      case 'modal':
      case 'jam':
        return (
          <>
            <View style={styles.containerJamOperasional}>
              <Text style={styles.hari}>{hari}</Text>
              <Text style={styles.hari}>{jamBuka}</Text>
              <Text style={styles.hari}>{jamTutup}</Text>
            </View>
          </>
        );
      case 'Keranjang':
        return (
          <>
            <View>
              <View style={styles.body}>
                <Image source={image} style={styles.image} />
                <View style={styles.columnBody}>
                  <Text style={styles.title} value={valueName}>
                    {name}
                  </Text>
                  <Number
                    number={price}
                    value={valuePrice}
                    style={styles.number}
                  />
                  <View style={styles.containerCounter}>
                    <Counter onValueChange={onCounterChange} />
                  </View>

                  <TouchableOpacity
                    style={styles.containerDelete}
                    onPress={onPress}>
                    <Image
                      source={require('../image/delete.png')}
                      style={styles.delete}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        );
      case 'tutup':
        return (
          <>
            {status === 'Tersedia' ? (
              <TouchableOpacity activeOpacity={0.4} onPress={handleOpenModal}>
                <View style={styles.containerCard}>
                  <View style={styles.containerImage}>
                    <Image source={image} style={styles.imageCard} />
                  </View>
                  <View style={styles.text}>
                    <View style={styles.containerTitle}>
                      <Text style={styles.titleCard} value={valueName}>
                        {name}
                      </Text>
                    </View>
                    <View style={styles.containerDescription}>
                      <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.containerPrice}>
                      {status === 'Tersedia' ? (
                        <Number
                          number={price}
                          value={valuePrice}
                          style={styles.priceCard}
                        />
                      ) : (
                        <Text style={styles.habis}>Persediaan Habis</Text>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.containerCardHabis}>
                <View style={styles.containerImage}>
                  <Image source={image} style={styles.imageCard} />
                </View>
                <View style={styles.text}>
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
                      <Text style={styles.habis}>Persediaan Habis</Text>
                    )}
                  </View>
                </View>
              </View>
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
                  <Image style={styles.imageModal} source={image} />
                  <View style={styles.containerTitleModal}>
                    <Text style={styles.descriptionTitleModal}>{name}</Text>
                  </View>
                  <View style={styles.containerDescriptionModal}>
                    <Text style={styles.textDescriptionModal}>
                      {description}
                    </Text>
                  </View>
                  <View style={styles.containerPriceModal}>
                    {status === 'Tersedia' ? (
                      <Number number={price} style={styles.priceCard} />
                    ) : (
                      <Text style={styles.habis}>Persediaan Habis</Text>
                    )}
                  </View>
                </View>
              </View>
            </Modal>
          </>
        );
      case 'card':
        return (
          <>
            {status === 'Tersedia' ? (
              <TouchableOpacity activeOpacity={0.4} onPress={handleOpenModal}>
                <View style={styles.containerCard}>
                  <View style={styles.containerImage}>
                    <Image source={image} style={styles.imageCard} />
                  </View>
                  <View style={styles.text}>
                    <View style={styles.containerTitle}>
                      <Text style={styles.titleCard} value={valueName}>
                        {name}
                      </Text>
                    </View>
                    <View style={styles.containerDescription}>
                      <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.containerPrice}>
                      {status === 'Tersedia' ? (
                        <Number
                          number={price}
                          value={valuePrice}
                          style={styles.priceCard}
                        />
                      ) : (
                        <Text style={styles.habis}>Persediaan Habis</Text>
                      )}
                    </View>
                  </View>
                  {status === 'Tersedia' ? (
                    <View>
                      {isItemInCart ? (
                        // <View style={styles.containerCounterButton}>
                        //   {/* <Counter onValueChange={onCounterChange} /> */}
                        //   <View style={styles.containerButton}>
                        //     <Text style={styles.buttonCard}>1 item</Text>
                        //   </View>
                        // </View>
                        <TouchableOpacity>
                          <View style={styles.containerButton}>
                            <Text style={styles.buttonCard}>1 item</Text>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={onPressTambah}>
                          <View style={styles.containerButton}>
                            <Text style={styles.buttonCard}>Tambah</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.containerCardHabis}>
                <View style={styles.containerImage}>
                  <Image
                    source={image ? {uri: image} : null}
                    style={styles.imageCard}
                  />
                </View>
                <View style={styles.text}>
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
                      <Text style={styles.habis}>Persediaan Habis</Text>
                    )}
                  </View>
                </View>
              </View>
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
                  <Image style={styles.imageModal} source={image} />
                  <View style={styles.containerTitleModal}>
                    <Text style={styles.descriptionTitleModal}>{name}</Text>
                  </View>
                  <View style={styles.containerDescriptionModal}>
                    <Text style={styles.textDescriptionModal}>
                      {description}
                    </Text>
                  </View>
                  <View style={styles.containerPriceModal}>
                    {status === 'Tersedia' ? (
                      <Number number={price} style={styles.priceCard} />
                    ) : (
                      <Text style={styles.habis}>Persediaan Habis</Text>
                    )}
                  </View>
                  {isItemInCart ? (
                    // <View style={styles.containerCounterButton}>
                    //   {/* <Counter onValueChange={onCounterChange} /> */}
                    //   <View style={styles.containerButton}>
                    //     <Text style={styles.buttonCard}>1 item</Text>
                    //   </View>
                    // </View>
                    <TouchableOpacity>
                      <View style={styles.buttonModalModal}>
                        <Text style={styles.buttonTambahModal}>1 item</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={onPressTambah}>
                      <View style={styles.buttonModalModal}>
                        <Text style={styles.buttonTambahModal}>
                          Tambah Pesanan
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          </>
        );
      default:
        return (
          <>
            <View style={styles.content}>
              <Text style={styles.title}>{name}</Text>
              <Number number={price} style={styles.CardpriceCard} />
            </View>
            <Rating />
          </>
        );
    }
  };
  return (
    <View>
      {status === 'Tersedia' ? (
        <TouchableOpacity activeOpacity={(0, 7)} onPress={onPress}>
          <View style={styles.container}>
            <Image style={styles.image} />
            {renderContent()}
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <Image style={styles.image} />
          {renderContent()}
        </View>
      )}
    </View>
  );
};

export default ItemListHome;

const styles = StyleSheet.create({
  containerCounterButton: {
    top: 20,
    left: 30,
    // backgroundColor: '#7A4141',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  containerDelete: {
    flex: 1,
    alignItems: 'flex-end',
  },
  delete: {
    width: 35,
    height: 35,
  },
  body: {
    marginHorizontal: 17,
    flexDirection: 'row',
    marginVertical: -10,
    top: -10,
    bottom: 20,
  },
  image: {
    width: 71,
    height: 71,
    borderRadius: 20,
  },
  columnBody: {
    marginLeft: 18,
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  number: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
  },
  containerCounter: {
    flex: 1,
    alignItems: 'flex-end',
  },
  // diatas cart
  containerPriceModal: {
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
    height: 19,
    left: 18,
    top: 15,
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
  //diatas Card

  // containerCounter: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  // },
  image: {
    borderRadius: 8,
    overflow: 'hidden',
    width: 60,
    height: 60,
    marginRight: 12,
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
    fontWeight: '700',
  },
  status: status => ({
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: status === 'Batal' ? '#D9435E' : '#1ABC9C',
  }),
  statusIn: status => ({
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: status === 'Menunggu_Konfirmasi' ? '#D9435E' : '#1ABC9C',
  }),

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
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -40,
    paddingBottom: 15,
  },
  containerCardHabis: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 15,
    marginTop: -40,
    // backgroundColor: '#d9d9d9',
  },

  text: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 177,
    height: 32,
    left: 35,
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
    top: 35,
  },
  titleCard: {
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
  containerDescription: {
    top: 35,
    height: 32,
    width: 140,
  },
  description: {
    fontWeight: '400',
    fontSize: 13,
  },
  containerPrice: {
    top: 30,
    width: 177,
    height: 32,
  },
  priceCard: {
    fontWeight: '600',
    fontSize: 15,
    color: 'green',
  },
  containerButton: {
    width: 85,
    height: 32,
    top: 20,
    left: 30,
    backgroundColor: '#7A4141',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  closeButtonPopUp: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    top: 5,
  }, //modal
  buttonCard: {
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
  },
});
