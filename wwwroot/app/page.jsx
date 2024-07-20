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
				<h2 className={styles.galleryTitle}>Latest Additions</h2>
				<div className={styles.gallery}>Gallery</div>
			</section>
			<section id='rings' className={`${styles.ctgWrap} flex column`}>
				<div className={styles.ctgUpper}>
					<h2 className={`${styles.ctgTitle} ${cinzel.variable}`}>Rings</h2>
					<p className={styles.ctgDesc}>
						When choosing between gold and silver rings, it is important to
						consider the benefits of each type. Gold rings are known for their
						timeless elegance and durability, while silver rings are valued for
						their affordability and versatility. Both options have their unique
						appeal, so it ultimately depends on your personal style and budget.
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
						cat_name='Gold Rings'
						color='gold'
					/>
				</div>
			</section>
			<section className={`${styles.discountWrap} flex`}>
				<div className={styles.discLeft}>
					<div className={`${styles.discPrice} ${messiri.variable} flex`}>
						-15%
					</div>
				</div>
				<div className={`${styles.discRight} flex column`}>
					<h3 className={styles.discTitle}>Sale</h3>
					<p className={styles.discDesc}>
						Please take the time to browse through our selection of high-quality
						jewelry, now available at a considerable 15% discount.
					</p>
				</div>
			</section>
			<section id='earrings'>
				<h2>Earrings</h2>
			</section>
			<section className={styles.galleryWrap}>
				<h2 className={styles.galleryTitle}>Trendy</h2>
				<div className={styles.gallery}>Gallery</div>
			</section>
			<section id='bracelets'>
				<h2>Bracelets</h2>
			</section>
			<section id='discount'>
				<div>sale 25%</div>
			</section>
			<section id='necklaces'>
				<h2>Necklaces</h2>
			</section>
			<section id='discount'>
				<div>Outlet</div>
			</section>
			<section id='sets'>
				<h2>Brooches, pendants, anklets</h2>
			</section>
			<section id='contact'>
				<h2>Contact</h2>
			</section>
		</main>
	)
}
