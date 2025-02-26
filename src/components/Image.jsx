import { IKImage } from 'imagekitio-react'

const Image = ({ src, className, width, height, description }) => {
    return (
        <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            path={src}
            loading='lazy'
            lqip={{ active: true, quality: 20 }}
            className={className}
            alt={description}
            width={width}
            height={height}
            transformation={[
                {
                    width: width,
                    height: height,
                }
            ]}
        />
    )
}

export default Image
