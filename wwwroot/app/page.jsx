import { Cinzel_Decorative, El_Messiri } from 'next/font/google'
import SubCatCart from './components/SubCatCart'
import styles from './page.module.css'

const cinzel = Cinzel_Decorative({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-cinzel',
	display: 'swap',
})
const messiri = El_Messiri({
	weight: ['400', '700'],
	subsets: ['latin'],
	variable: '--font-messiri',
	display: 'swap',
})

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.galleryWrap}>
				<h3 className={styles.galleryTitle}>Latest Additions</h3>
				<div className={styles.gallery}>Gallery</div>
			</section>
			<section id='rings' className={`${styles.ctgWrap} flex column`}>
				<div className={styles.ctgUpper}>
					<h1 className={`${styles.ctgTitle} ${cinzel.variable}`}>Rings</h1>
					<p className={styles.ctgDesc}>
						When choosing rings, it is essential to consider the distinct
						qualities of gold and silver. Gold rings are known for their
						timeless elegance, durability, and rich hues, making them a
						sophisticated choice suitable for any occasion and a lasting
						investment in style. Silver rings, with their sleek and modern
						design, offer a contemporary appeal for a casual yet chic look,
						perfect for both daily wear and special occasions. At LuxGleam, we
						offer an exquisite selection of both, ensuring you find the perfect
						ring to suit your individual style.
					</p>
				</div>
				<div className={`${styles.ctgBottom} flex`}>
					<SubCatCart
						src={'/media/1/silver.png'}
						cat_name='Silver rings'
						color='silver'
					/>
					<SubCatCart
						src={'/media/1/gold.png'}
						cat_name='Gold rings'
						color='gold'
					/>
				</div>
			</section>
			<section className={`${styles.discountWrap} flex`}>
				<div className={`${styles.discLeft} ${styles.disc15}`}>
					<div className={`${styles.discPrice} ${messiri.variable} flex`}>
						-15%
					</div>
				</div>
				<div className={`${styles.discRight} flex column`}>
					<h2 className={styles.discTitle}>Sale</h2>
					<p className={styles.discDesc}>
						Jewelry has the power to transform any outfit, and at LuxGleam, we
						believe that every piece tells a story. Our collection features
						stunning bijouterie that cater to diverse tastes and styles,
						ensuring you find the perfect accessory to express yourself.
						<br />
						<br />
						Explore our selection of products with a considerable 15% discount.
					</p>
				</div>
			</section>
			<section id='earrings' className={`${styles.ctgWrap} flex column`}>
				<div className={styles.ctgUpper}>
					<h1 className={`${styles.ctgTitle} ${cinzel.variable}`}>Earrings</h1>
					<p className={styles.ctgDesc}>
						Earrings are a perfect way to express your individuality and add a
						touch of elegance to any outfit. Whether you prefer the classic glam
						of gold or the trendy allure of silver, LuxGleam offers a variety of
						designs to suit every taste. From delicate studs to statement hoops,
						our earrings are crafted to enhance your natural beauty and reflect
						your personal style.
					</p>
				</div>
				<div className={`${styles.ctgBottom} flex`}>
					<SubCatCart
						src={'/media/2/silver.png'}
						cat_name='Silver earrings'
						color='silver'
					/>
					<SubCatCart
						src={'/media/2/gold.png'}
						cat_name='Gold earrings'
						color='gold'
					/>
				</div>
			</section>
			<section className={styles.galleryWrap}>
				<h3 className={styles.galleryTitle}>Trendy</h3>
				<div className={styles.gallery}>Gallery</div>
			</section>
			<section id='bracelets' className={`${styles.ctgWrap} flex column`}>
				<div className={styles.ctgUpper}>
					<h1 className={`${styles.ctgTitle} ${cinzel.variable}`}>Bracelets</h1>
					<p className={styles.ctgDesc}>
						Bracelets are more than just accessories; they are versatile pieces
						that can elevate any look. At LuxGleam, our stunning array of gold
						and silver bracelets allows you to make a unique statement. Gold
						bracelets exude luxury and timelessness, making them perfect for
						formal occasions or adding a touch of elegance to everyday wear. On
						the other hand, silver bracelets offer a contemporary vibe and
						versatility, seamlessly fitting into both casual and chic ensembles.
						Explore our collection to discover the bracelet that perfectly
						complements your unique style.
					</p>
				</div>
				<div className={`${styles.ctgBottom} flex`}>
					<SubCatCart
						src={'/media/3/silver.png'}
						cat_name='Silver bracelets'
						color='silver'
					/>
					<SubCatCart
						src={'/media/3/gold.png'}
						cat_name='Gold bracelets'
						color='gold'
					/>
				</div>
			</section>
			<section className={`${styles.discountWrap} flex`}>
				<div className={`${styles.discLeft} ${styles.disc25}`}>
					<div className={`${styles.discPrice} ${messiri.variable} flex`}>
						-25%
					</div>
				</div>
				<div className={`${styles.discRight} flex column`}>
					<h2 className={styles.discTitle}>Sale</h2>
					<p className={styles.discDesc}>
						At LuxGleam, we understand that jewelry is not just a decoration; it
						is an extension of who you are. Our carefully curated collection of
						accessories ensures that you can find pieces that resonate with your
						individuality.
						<br />
						<br />
						Check out our amazing assortment of gorgeous jewelry and get a sweet
						deal of 25% off!
					</p>
				</div>
			</section>
			<section id='necklaces' className={`${styles.ctgWrap} flex column`}>
				<div className={styles.ctgUpper}>
					<h1 className={`${styles.ctgTitle} ${cinzel.variable}`}>Necklaces</h1>
					<p className={styles.ctgDesc}>
						A necklace has the power to transform an outfit and become a
						cherished piece in your jewelry collection. LuxGleam’s selection of
						gold and silver necklaces includes everything from elegant pendants
						and sophisticated chains to eye-catching statement pieces. Whether
						you’re drawn to the classic beauty of gold or the sleek
						sophistication of silver, our necklaces are designed to reflect your
						unique style and personality.
					</p>
				</div>
				<div className={`${styles.ctgBottom} flex`}>
					<SubCatCart
						src={'/media/4/silver.png'}
						cat_name='Silver necklaces'
						color='silver'
					/>
					<SubCatCart
						src={'/media/4/gold.png'}
						cat_name='Gold necklaces'
						color='gold'
					/>
				</div>
			</section>
			<section className={styles.galleryWrap}>
				<h3 className={styles.galleryTitle}>Outlet</h3>
				<div className={styles.gallery}>Gallery</div>
			</section>
			<section className={`${styles.ctgWrap} flex column`}>
				<h1
					className={`${styles.ctgTitle} ${styles.ctgTitleTriple} ${cinzel.variable}`}>
					Brooches, pendants, anklets
				</h1>
				<div className={`flex ${styles.triple}`}>
					<p className={`${styles.ctgDesc} ${styles.ctgDescTriple}`}>
						{/* Exquisite jewelry, made from shimmering gold and icy silver, crafted
						with love and talent. Adorn your moments with the glamour of
						LuxGleam.  */}
						Accentuate your look with our carefully curated collections,
						designed for every occasion. Small accessories can completely
						transform an outfit and showcase your personal style. Click to
						explore and add a touch of LuxGlam charm to your life.
					</p>
					<div className={`flex ${styles.tripleLeft}`}>
						<SubCatCart
							src={'/media/5/anklets.png'}
							cat_name='Anklets'
							color='gold'
						/>
					</div>
					<div className={`flex ${styles.tripleMiddle}`}>
						<SubCatCart
							src={'/media/6/brooches.png'}
							cat_name='Brooches'
							color='gold'
						/>
					</div>
					<div className={`flex ${styles.tripleRight}`}>
						<SubCatCart
							src={'/media/7/pendants.png'}
							cat_name='Pendants'
							color='gold'
						/>
					</div>
				</div>
			</section>
			<section id='contact'>
				<h3>Contact</h3>
			</section>
		</main>
	)
}
